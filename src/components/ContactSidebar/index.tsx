import { useState } from "react";
import { Notebook, BadgePlus, X } from "lucide-react";
import { Sidebar } from "./styles";
import { useCategories } from "../../hooks/useCategories";
import { AddGroupModal } from "../AddGroupModal";
import type { Contact } from "../../types/Contact";

export interface ContactSidebarProps {
  contactCount: number;
  contacts: Contact[];
  onSelectGroup: (group: string | null) => void;
}

export function ContactSidebar({
  contactCount,
  contacts,
  onSelectGroup,
}: ContactSidebarProps) {
  const { categories, deleteCategory } = useCategories(); // certifique-se de que essa função existe
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);

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
        `O grupo "${categoryName}" possui contatos associados e não pode ser excluído.`
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
          <p onClick={() => onSelectGroup(null)}>
            Todos os contatos ({contactCount})
          </p>
          <hr />
          <div className="group-wrapper">
            <span>Grupos</span>
            <button
              onClick={() => setIsAddGroupOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Adicionar grupo"
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
                  onClick={() => onSelectGroup(category.id)}
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

      <AddGroupModal
        isOpen={isAddGroupOpen}
        onRequestClose={() => setIsAddGroupOpen(false)}
      />
    </>
  );
}
