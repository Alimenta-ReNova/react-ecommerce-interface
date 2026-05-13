import { useCallback } from "react";

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
      asyncStorageModule = (mod && (mod.default ?? mod)) as AsyncStorageType;
      return asyncStorageModule;
    } catch (e) {
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

export function useSafeStorage() {
  const getItem = useCallback((key: string) => storageGetItem(key), []);
  const setItem = useCallback(
    (key: string, value: string) => storageSetItem(key, value),
    [],
  );
  const removeItem = useCallback((key: string) => storageRemoveItem(key), []);

  return { getItem, setItem, removeItem };
}
