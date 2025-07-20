import { useState } from "react";
import { Notebook, BadgePlus, X } from "lucide-react";
import { Sidebar } from "./styles";
import { useCategories } from "../../hooks/useCategories";
import { AddCategoryModal } from "../AddCategoryModal/AddCategoryModal";
import type { Contact } from "../../types/Contact";
import { toast } from "react-toastify";

export interface ContactSidebarProps {
  contactCount: number;
  contacts: Contact[];
  onSelectCategory: (category: string | null) => void;
  isMobileOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

interface CategoryItemProps {
  name: string;
  id: string;
  count: number;
  onSelect: () => void;
  onDelete: () => void;
}

function CategoryItem({ name, count, onSelect, onDelete }: CategoryItemProps) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span onClick={onSelect} style={{ flex: 1 }}>
        {name} ({count})
      </span>
      <X
        size={16}
        style={{ marginLeft: "8px", cursor: "pointer" }}
        onClick={onDelete}
      />
    </li>
  );
}

function SidebarOverlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 9,
      }}
    />
  );
}

export function ContactSidebar({
  contactCount,
  contacts,
  onSelectCategory,
  isMobileOpen = false,
  onCloseMobileMenu,
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
      toast.error(
        `A categoria "${categoryName}" possui contatos associados e não pode ser excluída.`
      );
      return;
    }

    deleteCategory(categoryId);
    toast.success(`Categoria "${categoryName}" excluída com sucesso.`);
  };

  return (
    <>
      {isMobileOpen && onCloseMobileMenu && (
        <SidebarOverlay onClick={onCloseMobileMenu} />
      )}

      <Sidebar className="glass" data-open={isMobileOpen}>
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
              <CategoryItem
                key={category.id}
                id={category.id}
                name={category.name}
                count={contactCountsByCategory[category.id] || 0}
                onSelect={() => onSelectCategory(category.id)}
                onDelete={() => handleDelete(category.id)}
              />
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
