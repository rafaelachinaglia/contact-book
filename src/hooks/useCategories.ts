import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
}

export function useCategories() {
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
  await fetch(`http://localhost:3001/category/${id}`, { method: "DELETE" });
  setCategories((prev) => prev.filter((c) => c.id !== id));
}


  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, addCategory, deleteCategory, loading }; 
}
