import { useState } from "react";
import { AddContactModal } from "../components/AddContact/AddContactModal";
import { ViewContactModal } from "../components/ViewContactModal";
import { useContacts } from "../hooks/useContacts";
import type { Contact } from "../types/Contact";
import {
  Container,
  MainContent,
  SectionTitle,
  ContactList,
  ContactCategory,
  ContactListItem,
  ContactName,
  ContactTag,
} from "./styles";
import { SearchAndAddBar } from "../components/SearchAndAddBar";
import { ContactSidebar } from "../components/ContactSidebar/index";
import { Tag, SquareArrowOutUpRight } from "lucide-react";
import { useCategories } from "../hooks/useCategories";

export function ContactsPage() {
  const { contacts, loading, error, removeContact, editContact } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    (categorys, contact) => {
      const categoryKey = contact.name[0].toUpperCase();
      categorys[categoryKey] ||= [];
      categorys[categoryKey].push(contact);
      return categorys;
    },
    {}
  );

  return (
    <Container>
      <ContactSidebar
        contactCount={contacts.length}
        onSelectCategory={(category) => setSelectedCategory(category)}
        contacts={contacts}
      />

      <MainContent>
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
          {Object.entries(categoryedContacts).map(([categoryKey, contacts]) => (
            <ContactCategory key={categoryKey}>
              <h3>{categoryKey}</h3>
              <ul>
                {contacts.map((contact) => {
                  const categoryName =
                    categories.find((cat) => cat.id === contact.category)
                      ?.name || "Sem Categoria";

                  return (
                    <ContactListItem
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <ContactName title={contact.name}>
                            {contact.name.length > 50
                              ? `${contact.name.slice(0, 50)}...`
                              : contact.name}
                          </ContactName>
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ContactTag>
                            <Tag size={14} color="#61b448ff" />
                            {categoryName}
                          </ContactTag>
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <SquareArrowOutUpRight size={16} />
                        </div>
                      </div>
                    </ContactListItem>
                  );
                })}
              </ul>
            </ContactCategory>
          ))}
        </ContactList>

        {selectedContact && (
          <ViewContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onDelete={(id) => {
              const confirmed = window.confirm(
                `Tem certeza que deseja excluir ${selectedContact.name}?`
              );
              if (confirmed) {
                removeContact(id);
                setSelectedContact(null);
              }
            }}
            onSave={(updated) => {
              const { id, ...data } = updated;
              editContact(id, data);
              setSelectedContact(updated);
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
