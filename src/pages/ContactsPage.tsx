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

export function ContactsPage() {
  const { contacts, loading, error, removeContact, editContact } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <ContactSidebar contactCount={contacts.length} />

      <MainContent>
        <SectionTitle>
          <h2>Todos os contatos</h2>
        </SectionTitle>

        <SearchAndAddBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddContact={() => setIsAddModalOpen(true)}
        />

        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}

        <ContactList>
          {Object.entries(groupedContacts).map(([category, contacts]) => (
            <ContactGroup key={category}>
              <h3>{category}</h3>
              <ul>
                {contacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <ContactName>{contact.name}</ContactName>
                    <ContactTag>
                      <Tag size={14} />
                      {contact.category}
                    </ContactTag>
                  </ContactListItem>
                ))}
              </ul>
            </ContactGroup>
          ))}
        </ContactList>

        {/* Modal de visualização/edição */}
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

        {/* Modal de adição */}
        <AddContactModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
        />
      </MainContent>
    </Container>
  );
}
