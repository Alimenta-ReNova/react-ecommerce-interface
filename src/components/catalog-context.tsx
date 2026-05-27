import React, { createContext, useContext, useEffect, useState } from "react";
import mockCatalogData from "../data/mock-catalog.json";

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
    } catch (error) {
      asyncStorageModule = null;
      return null;
    }
  }

  return asyncStorageModule as AsyncStorageType | null;
}

async function storageGetItem(key: string) {
  const storage = await getStorage();
  if (storage && storage.getItem) return storage.getItem(key);
  return memoryStore[key] ?? null;
}

async function storageSetItem(key: string, value: string) {
  const storage = await getStorage();
  if (storage && storage.setItem) return storage.setItem(key, value);
  memoryStore[key] = value;
}

export type CatalogItem = {
  id: string;
  name: string;
  color: string;
  icon: string;
  label: string;
  labelColor: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  items: CatalogItem[];
};

type CatalogContextValue = {
  categories: CatalogCategory[];
  isLoading: boolean;
  addCategory: (
    category: Omit<CatalogCategory, "id" | "items">,
  ) => Promise<void>;
  updateCategory: (
    categoryId: string,
    patch: Partial<Omit<CatalogCategory, "id" | "items">>,
  ) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  addItem: (categoryId: string, item: Omit<CatalogItem, "id">) => Promise<void>;
  updateItem: (
    categoryId: string,
    itemId: string,
    patch: Partial<Omit<CatalogItem, "id">>,
  ) => Promise<void>;
  deleteItem: (categoryId: string, itemId: string) => Promise<void>;
};

const CATALOG_STORAGE_KEY = "@renova:catalog";

const DEFAULT_CATEGORIES: CatalogCategory[] = Array.isArray(mockCatalogData)
  ? (mockCatalogData as CatalogCategory[])
  : [];

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeCategories(value: unknown) {
  if (!Array.isArray(value)) {
    return DEFAULT_CATEGORIES;
  }

  const categories = value.filter(Boolean) as CatalogCategory[];
  return categories.length > 0 ? categories : DEFAULT_CATEGORIES;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(
  undefined,
);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] =
    useState<CatalogCategory[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const storedCatalog = await storageGetItem(CATALOG_STORAGE_KEY);

        if (storedCatalog) {
          setCategories(normalizeCategories(JSON.parse(storedCatalog)));
          return;
        }

        setCategories(DEFAULT_CATEGORIES);
      } catch (error) {
        setCategories(DEFAULT_CATEGORIES);
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalog();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    storageSetItem(CATALOG_STORAGE_KEY, JSON.stringify(categories));
  }, [categories, isLoading]);

  const addCategory = async (
    category: Omit<CatalogCategory, "id" | "items">,
  ) => {
    setCategories((current) => [
      ...current,
      { id: createId("category"), items: [], ...category },
    ]);
  };

  const updateCategory = async (
    categoryId: string,
    patch: Partial<Omit<CatalogCategory, "id" | "items">>,
  ) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId ? { ...category, ...patch } : category,
      ),
    );
  };

  const deleteCategory = async (categoryId: string) => {
    setCategories((current) =>
      current.filter((category) => category.id !== categoryId),
    );
  };

  const addItem = async (categoryId: string, item: Omit<CatalogItem, "id">) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: [...category.items, { id: createId("item"), ...item }],
            }
          : category,
      ),
    );
  };

  const updateItem = async (
    categoryId: string,
    itemId: string,
    patch: Partial<Omit<CatalogItem, "id">>,
  ) => {
    setCategories((current) =>
      current.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, ...patch } : item,
              ),
            },
      ),
    );
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            }
          : category,
      ),
    );
  };

  return (
    <CatalogContext.Provider
      value={{
        categories,
        isLoading,
        addCategory,
        updateCategory,
        deleteCategory,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }

  return context;
}
