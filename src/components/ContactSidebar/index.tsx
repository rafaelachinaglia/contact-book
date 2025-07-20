import { useState } from "react";
import { Notebook, BadgePlus, X } from "lucide-react";
import { Sidebar } from "./styles";
import { useCategories } from "../../hooks/useCategories";
import { AddCategoryModal } from "../AddCategoryModal";
import type { Contact } from "../../types/Contact";

export interface ContactSidebarProps {
  contactCount: number;
  contacts: Contact[];
  onSelectCategory: (category: string | null) => void;
}

export function ContactSidebar({
  contactCount,
  contacts,
  onSelectCategory,
}: ContactSidebarProps) {
  const { categories, deleteCategory } = useCategories(); 
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const contactCountsByCategory = categories.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category.id] = contacts.filter(
        (contact) => contact.category === category.id
      ).length;
      return acc;
    },
    {}
  );

  const handleDelete = (categoryId: string) => {
    const count = contactCountsByCategory[categoryId];
    const categoryName = categories.find((cat) => cat.id === categoryId)?.name;

    if (count > 0) {
      alert(
        `A categoria "${categoryName}" possui contatos associados e não pode ser excluído.`
      );
      return;
    }

    console.log("aqqqqqqqqq");
    deleteCategory(categoryId);
  };

  return (
    <>
      <Sidebar className="glass">
        <div className="logo">
          <div className="icon-wrapper">
            <Notebook size={18} color="#fff" />
          </div>
          <h1>Contatos</h1>
        </div>
        <nav>
          <p onClick={() => onSelectCategory(null)}>
            Todos os contatos ({contactCount})
          </p>
          <hr />
          <div className="category-wrapper">
            <span>Categorias</span>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Adicionar Categoria"
            >
              <BadgePlus size={18} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  onClick={() => onSelectCategory(category.id)}
                  style={{ flex: 1 }}
                >
                  {category.name} ({contactCountsByCategory[category.id] || 0})
                </span>
                <X
                  size={16}
                  style={{ marginLeft: "8px", cursor: "pointer" }}
                  onClick={() => handleDelete(category.id)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </Sidebar>

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onRequestClose={() => setIsAddCategoryOpen(false)}
      />
    </>
  );
}
