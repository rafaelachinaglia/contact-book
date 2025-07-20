import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }

  async function addCategory(name: string) {
    const newCategory = { id: crypto.randomUUID(), name };
    const res = await fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    if (res.ok) {
      setCategories((prev) => [...prev, newCategory]);
    }
  }

  async function deleteCategory(id: string) {
    await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
    });
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, addCategory, deleteCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories deve ser usado dentro de CategoriesProvider");
  }
  return context;
}
