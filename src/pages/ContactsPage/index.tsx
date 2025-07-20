import { useState } from "react";
import { AddContactModal } from "../../components/AddContact/AddContactModal";
import { ViewContactModal } from "../../components/ViewContactModal";
import { useContacts } from "../../hooks/useContacts";
import type { Contact } from "../../types/Contact";
import {
  Container,
  MainContent,
  SectionTitle,
  ContactList,
  ContactCategory,
  ContactListItem,
  ContactItemContent,
  ContactMetaRow,
  ContactName,
  ContactTag,
  MobileMenuButton,
  FloatingAddButton,
} from "./styles";
import { SearchAndAddBar } from "../../components/SearchAndAddBar";
import { ContactSidebar } from "../../components/ContactSidebar/index";
import { Tag, SquareArrowOutUpRight, Menu, Plus } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function ContactsPage() {
  const { contacts, loading, error, removeContact, editContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { categories } = useCategories();

  const selectedCategoryName = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)?.name
    : null;

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((contact) =>
      selectedCategory ? contact.category === selectedCategory : true
    );

  const categoryedContacts = filteredContacts.reduce<Record<string, Contact[]>>(
    (acc, contact) => {
      const categoryKey = contact.name[0].toUpperCase();
      acc[categoryKey] ||= [];
      acc[categoryKey].push(contact);
      return acc;
    },
    {}
  );

  const handleDelete = async (id: number, name: string) => {
    try {
      const result = await Swal.fire({
        title: "Tem certeza?",
        text: `Deseja excluir ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c0392b",
        cancelButtonColor: "#004080",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await removeContact(id);
        toast.success("Contato excluído com sucesso!");
        setSelectedContact(null);
      }
    } catch (error) {
      toast.error("Erro ao excluir o contato.");
    }
  };

  return (
    <Container>
      <ContactSidebar
        contactCount={contacts.length}
        contacts={contacts}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setIsMobileSidebarOpen(false);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobileMenu={() => setIsMobileSidebarOpen(false)}
      />

      <MainContent>
        <MobileMenuButton onClick={() => setIsMobileSidebarOpen(true)}>
          <Menu size={24} color="#61b448" />
        </MobileMenuButton>

        <FloatingAddButton onClick={() => setIsAddModalOpen(true)}>
          <Plus size={22} color="#fff" />
        </FloatingAddButton>

        <SectionTitle>
          <h2>
            {selectedCategory
              ? `${selectedCategoryName ?? selectedCategory}`
              : "Todos os contatos"}
          </h2>
        </SectionTitle>

        <SearchAndAddBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddContact={() => setIsAddModalOpen(true)}
        />

        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}

        <ContactList>
          {Object.entries(categoryedContacts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([categoryKey, contacts]) => {
              const sortedContacts = [...contacts].sort((a, b) =>
                a.name.localeCompare(b.name)
              );

              return (
                <ContactCategory key={categoryKey}>
                  <h3>{categoryKey}</h3>
                  <ul>
                    {sortedContacts.map((contact) => {
                      const categoryName =
                        categories.find((cat) => cat.id === contact.category)
                          ?.name || "Sem Categoria";

                      return (
                        <ContactListItem
                          key={contact.id}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <ContactItemContent>
                            <ContactName title={contact.name}>
                              {contact.name.length > 50
                                ? `${contact.name.slice(0, 50)}...`
                                : contact.name}
                            </ContactName>

                            <ContactMetaRow>
                              <ContactTag>
                                <Tag size={14} color="#61b448ff" />
                                {categoryName}
                              </ContactTag>
                              <SquareArrowOutUpRight
                                size={16}
                                color="#61b448ff"
                              />
                            </ContactMetaRow>
                          </ContactItemContent>
                        </ContactListItem>
                      );
                    })}
                  </ul>
                </ContactCategory>
              );
            })}
        </ContactList>

        {selectedContact && (
          <ViewContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onDelete={(id) => handleDelete(id, selectedContact.name)}
            onSave={(updated) => {
              const { id, ...data } = updated;
              try {
                editContact(id, data);
                setSelectedContact(updated);
                toast.success("Contato atualizado com sucesso!");
              } catch {
                toast.error("Erro ao atualizar o contato.");
              }
            }}
          />
        )}

        <AddContactModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
        />
      </MainContent>
    </Container>
  );
}
