import React, { createContext, useContext, useEffect, useState } from "react";

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
};

export const mockAccounts: MockAccount[] = [
  {
    role: "user",
    name: "Ingrid Souza",
    email: "ingrid.souza@furg.br",
    password: "user123",
    cpf: "123.456.789-00",
    phone: "(53) 9xxxx-xxxx",
  },
  {
    role: "admin",
    name: "Carlos Admin",
    email: "admin@renova.com",
    password: "admin123",
    cpf: "987.654.321-00",
    phone: "(53) 9yyyy-yyyy",
  },
];

export function getMockAccount(role: UserRole) {
  return mockAccounts.find((account) => account.role === role);
}

export function validateMockCredentials(
  role: UserRole,
  email: string,
  password: string,
) {
  const account = getMockAccount(role);

  return Boolean(
    account &&
    account.email.toLowerCase() === email.trim().toLowerCase() &&
    account.password === password,
  );
}

type AuthContextValue = {
  role: UserRole | null;
  user: MockAccount | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
};

const AUTH_STORAGE_KEY = "@renova:auth-role";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<MockAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const storedRole = await storageGetItem(AUTH_STORAGE_KEY);

        if (storedRole === "user" || storedRole === "admin") {
          setRole(storedRole);
          setUser(getMockAccount(storedRole));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadRole();
  }, []);

  const signIn = async (nextRole: UserRole) => {
    await storageSetItem(AUTH_STORAGE_KEY, nextRole);
    setRole(nextRole);
    setUser(getMockAccount(nextRole));
  };

  const signOut = async () => {
    await storageRemoveItem(AUTH_STORAGE_KEY);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        isAuthenticated: role !== null,
        isLoading,
        signIn,
        signOut,
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
