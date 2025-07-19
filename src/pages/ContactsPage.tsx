import { useEffect, useState } from "react";
import { AddContactModal } from "../components/AddContact/AddContactModal";
import { EditContactModal } from "../components/EditContactModal";
import { useContacts } from "../hooks/useContacts";
import type { Contact } from "../types/Contact";
import {
  Container,
  MainContent,
  SectionTitle,
  ContactList,
  ContactGroup,
} from "./styles";
import { SearchAndAddBar } from "../components/SearchAndAddBar";
import { ContactCard } from "../components/ContactCard";
import { ContactSidebar } from "../components/ContactSidebar/index";

export function ContactsPage() {
  const { contacts, loading, error, removeContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const dropdowns = document.querySelectorAll(".dropdown-wrapper");

      const clickedInsideSomeDropdown = Array.from(dropdowns).some((dropdown) =>
        dropdown.contains(target)
      );

      if (!clickedInsideSomeDropdown) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    searchTerm={searchTerm}
                    isOpen={openMenuId === contact.id}
                    onToggleMenu={() =>
                      setOpenMenuId(
                        openMenuId === contact.id ? null : contact.id
                      )
                    }
                    onEdit={() => setSelectedContact(contact)}
                    onDelete={() => {
                      const confirmed = window.confirm(
                        `Tem certeza que deseja excluir ${contact.name}?`
                      );
                      if (confirmed) {
                        removeContact(contact.id);
                      }
                    }}
                  />
                ))}
              </ul>
            </ContactGroup>
          ))}
        </ContactList>

        {selectedContact && (
          <EditContactModal
            isOpen={!!selectedContact}
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
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
