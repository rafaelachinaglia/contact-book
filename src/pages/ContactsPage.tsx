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
  ContactGroup,
  ContactListItem,
  ContactName,
  ContactTag,
} from "./styles";
import { SearchAndAddBar } from "../components/SearchAndAddBar";
import { ContactSidebar } from "../components/ContactSidebar/index";
import { Tag } from "lucide-react";
import { useCategories } from "../hooks/useCategories";

export function ContactsPage() {
  const { contacts, loading, error, removeContact, editContact } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const { categories } = useCategories();

  // Busca o nome da categoria selecionada
  const selectedCategoryName = selectedGroup
    ? categories.find((cat) => cat.id === selectedGroup)?.name
    : null;

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((contact) =>
      selectedGroup ? contact.category === selectedGroup : true
    );

  const groupedContacts = filteredContacts.reduce<Record<string, Contact[]>>(
    (groups, contact) => {
      const groupKey = contact.name[0].toUpperCase();
      groups[groupKey] ||= [];
      groups[groupKey].push(contact);
      return groups;
    },
    {}
  );

  return (
    <Container>
      <ContactSidebar
        contactCount={contacts.length}
        onSelectGroup={(group) => setSelectedGroup(group)}
        contacts={contacts} 
      />

      <MainContent>
        <SectionTitle>
          <h2>
            {selectedGroup
              ? `${selectedCategoryName ?? selectedGroup}`
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
          {Object.entries(groupedContacts).map(([groupKey, contacts]) => (
            <ContactGroup key={groupKey}>
              <h3>{groupKey}</h3>
              <ul>
                {contacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <ContactName>{contact.name}</ContactName>
                    <ContactTag>
                      <Tag size={14} />
                      {categories.find((cat) => cat.id === contact.category)
                        ?.name || "Sem grupo"}
                    </ContactTag>
                  </ContactListItem>
                ))}
              </ul>
            </ContactGroup>
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
