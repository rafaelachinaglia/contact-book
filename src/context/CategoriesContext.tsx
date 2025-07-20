import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

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

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

const BASE_URL = "http://localhost:3001/categories";

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Erro ao buscar categorias.");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(name: string) {
    const nameLower = name.trim().toLowerCase();
    const alreadyExists = categories.some(
      (cat) => cat.name.trim().toLowerCase() === nameLower
    );

    if (alreadyExists) {
      toast.warn("Essa categoria já existe!");
      return;
    }

    const newCategory = { id: crypto.randomUUID(), name };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!res.ok) throw new Error("Erro ao adicionar categoria.");

      setCategories((prev) => [...prev, newCategory]);
      toast.success("Categoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      toast.error("Erro ao adicionar categoria.");
    }
  }

  async function deleteCategory(id: string) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao deletar categoria.");

      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      toast.error("Erro ao excluir categoria.");
    }
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
