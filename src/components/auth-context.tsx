import React, { createContext, useContext, useEffect, useState } from "react";
import mockAccountsData from "../data/mock-accounts.json";

// Lazy-load AsyncStorage to avoid native module crash in Expo Go
type AsyncStorageType = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

let asyncStorageModule: AsyncStorageType | null | "loading" = "loading";
const memoryStore: Record<string, string> = {};

async function getStorage(): Promise<AsyncStorageType | null> {
  if (asyncStorageModule === "loading") {
    try {
      const mod = await import("@react-native-async-storage/async-storage");
      // package exports default
      asyncStorageModule = (mod && (mod.default ?? mod)) as AsyncStorageType;
      return asyncStorageModule;
    } catch (e) {
      // native module not available (Expo Go). fallback to memory store
      asyncStorageModule = null;
      return null;
    }
  }

  return asyncStorageModule as AsyncStorageType | null;
}

async function storageGetItem(key: string) {
  const s = await getStorage();
  if (s && s.getItem) return s.getItem(key);
  return memoryStore[key] ?? null;
}

async function storageSetItem(key: string, value: string) {
  const s = await getStorage();
  if (s && s.setItem) return s.setItem(key, value);
  memoryStore[key] = value;
}

async function storageRemoveItem(key: string) {
  const s = await getStorage();
  if (s && s.removeItem) return s.removeItem(key);
  delete memoryStore[key];
}

export type UserRole = "user" | "admin";

export type MockAccount = {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  photo?: string;
};

const seededMockAccounts: MockAccount[] = Array.isArray(mockAccountsData)
  ? (mockAccountsData as MockAccount[])
  : [];

let mockAccountsStore: MockAccount[] = [...seededMockAccounts];

function getAccountsSnapshot() {
  return mockAccountsStore;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isMockAccount(value: unknown): value is MockAccount {
  if (!value || typeof value !== "object") {
    return false;
  }

  const account = value as MockAccount;

  return (
    (account.role === "user" || account.role === "admin") &&
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.password === "string" &&
    typeof account.cpf === "string" &&
    typeof account.phone === "string" &&
    (account.photo === undefined || typeof account.photo === "string")
  );
}

export function getMockAccount(role: UserRole) {
  return getAccountsSnapshot().find((account) => account.role === role);
}

export function validateMockCredentials(
  role: UserRole,
  email: string,
  password: string,
) {
  const account = getAccountsSnapshot().find(
    (item) =>
      item.role === role &&
      normalizeEmail(item.email) === normalizeEmail(email),
  );

  return Boolean(account && account.password === password);
}

function loadAccountsFromStorage(rawAccounts: string | null) {
  if (!rawAccounts) {
    return [...seededMockAccounts];
  }

  try {
    const parsed = JSON.parse(rawAccounts) as unknown;

    if (!Array.isArray(parsed)) {
      return [...seededMockAccounts];
    }

    const validAccounts = parsed.filter(isMockAccount);

    return validAccounts.length > 0 ? validAccounts : [...seededMockAccounts];
  } catch {
    return [...seededMockAccounts];
  }
}

type AuthContextValue = {
  role: UserRole | null;
  user: MockAccount | null;
  accounts: MockAccount[];
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (role: UserRole, email?: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (account: Omit<MockAccount, "role">) => Promise<void>;
  updateUserPhoto: (photo: string) => Promise<void>;
  themeMode: "light" | "dark";
  toggleThemeMode: () => Promise<void>;
};

type AuthStorageValue = {
  role: UserRole;
  email?: string;
};

const AUTH_STORAGE_KEY = "@renova:auth-role";
const THEME_STORAGE_KEY = "@renova:theme-mode";
const ACCOUNTS_STORAGE_KEY = "@renova:mock-accounts";
const USER_THEME_STORAGE_PREFIX = "@renova:user-theme-";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<MockAccount | null>(null);
  const [accounts, setAccounts] = useState<MockAccount[]>(seededMockAccounts);
  const [isLoading, setIsLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const loadRole = async () => {
      try {
        const storedRole = await storageGetItem(AUTH_STORAGE_KEY);
        const storedAccounts = await storageGetItem(ACCOUNTS_STORAGE_KEY);

        const nextAccounts = loadAccountsFromStorage(storedAccounts);
        mockAccountsStore = nextAccounts;
        setAccounts(nextAccounts);

        if (storedRole) {
          try {
            const parsed = JSON.parse(storedRole) as AuthStorageValue;

            if (parsed && (parsed.role === "user" || parsed.role === "admin")) {
              const storedEmail = parsed.email
                ? normalizeEmail(parsed.email)
                : null;
              const nextUser = storedEmail
                ? (nextAccounts.find(
                    (account) =>
                      account.role === parsed.role &&
                      normalizeEmail(account.email) === storedEmail,
                  ) ??
                  nextAccounts.find(
                    (account) => account.role === parsed.role,
                  ) ??
                  null)
                : (nextAccounts.find(
                    (account) => account.role === parsed.role,
                  ) ?? null);

              setRole(parsed.role);
              setUser(nextUser);

              if (nextUser) {
                const userThemeKey =
                  USER_THEME_STORAGE_PREFIX + normalizeEmail(nextUser.email);
                const userTheme = await storageGetItem(userThemeKey);
                if (userTheme === "light" || userTheme === "dark") {
                  setThemeMode(userTheme);
                } else {
                  setThemeMode("light");
                }
              }
            }
          } catch {
            if (storedRole === "user" || storedRole === "admin") {
              setRole(storedRole);
              setUser(
                nextAccounts.find((account) => account.role === storedRole) ??
                  null,
              );
              setThemeMode("light");
            }
          }
        } else {
          setThemeMode("light");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadRole();
  }, []);

  const signIn = async (nextRole: UserRole, email?: string) => {
    const normalizedEmail = email ? normalizeEmail(email) : null;
    let nextThemeMode: "light" | "dark" = "light";

    if (normalizedEmail) {
      const userThemeKey = USER_THEME_STORAGE_PREFIX + normalizedEmail;
      const storedTheme = await storageGetItem(userThemeKey);

      if (storedTheme === "light" || storedTheme === "dark") {
        nextThemeMode = storedTheme;
      }
    }

    setThemeMode(nextThemeMode);
    await storageSetItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        role: nextRole,
        email: normalizedEmail ?? undefined,
      }),
    );
    setRole(nextRole);
    setUser(
      (normalizedEmail
        ? getAccountsSnapshot().find(
            (account) =>
              account.role === nextRole &&
              normalizeEmail(account.email) === normalizedEmail,
          )
        : null) ??
        getAccountsSnapshot().find((account) => account.role === nextRole) ??
        null,
    );
  };

  const signOut = async () => {
    await storageRemoveItem(AUTH_STORAGE_KEY);
    setRole(null);
    setUser(null);
    setThemeMode("light");
  };

  const registerUser = async (account: Omit<MockAccount, "role">) => {
    const nextAccount: MockAccount = {
      role: "user",
      name: account.name.trim(),
      email: normalizeEmail(account.email),
      password: account.password,
      cpf: account.cpf.trim(),
      phone: account.phone.trim(),
    };

    const normalizedEmail = normalizeEmail(nextAccount.email);
    const emailExists = getAccountsSnapshot().some(
      (item) => normalizeEmail(item.email) === normalizedEmail,
    );

    if (emailExists) {
      throw new Error("Já existe um usuário cadastrado com este e-mail.");
    }

    const nextAccounts = [...getAccountsSnapshot(), nextAccount];
    mockAccountsStore = nextAccounts;
    setAccounts(nextAccounts);
    await storageSetItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(nextAccounts));
  };

  const toggleThemeMode = async () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    if (user) {
      const userThemeKey =
        USER_THEME_STORAGE_PREFIX + normalizeEmail(user.email);
      await storageSetItem(userThemeKey, newTheme);
    }
  };

  const updateUserPhoto = async (photo: string) => {
    if (!user) return;

    const nextAccounts = getAccountsSnapshot().map((account) =>
      normalizeEmail(account.email) === normalizeEmail(user.email)
        ? { ...account, photo }
        : account,
    );

    mockAccountsStore = nextAccounts;
    setAccounts(nextAccounts);
    setUser({ ...user, photo });
    await storageSetItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(nextAccounts));
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        accounts,
        isAuthenticated: role !== null,
        isLoading,
        signIn,
        signOut,
        registerUser,
        updateUserPhoto,
        themeMode,
        toggleThemeMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function useThemeMode() {
  const { themeMode, toggleThemeMode } = useAuth();
  return { themeMode, toggleThemeMode };
}
