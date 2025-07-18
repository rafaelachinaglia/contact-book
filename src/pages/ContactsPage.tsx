import { useState } from "react";
import { AddContactForm } from "../components/AddContactForm";
import { EditContactModal } from "../components/EditContactModal";
import { useContacts } from "../hooks/useContacts";
import type { Contact } from "../types/Contact";

// Função de agrupamento por inicial do nome
function groupContactsByInitial(contacts: Contact[]) {
  const grouped: Record<string, Contact[]> = {};

  contacts.forEach((contact) => {
    const initial = contact.name.charAt(0).toUpperCase();
    if (!grouped[initial]) {
      grouped[initial] = [];
    }
    grouped[initial].push(contact);
  });

  return grouped;
}

export function ContactsPage() {
  const { contacts, loading, error, removeContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const groupedContacts = groupContactsByInitial(contacts);
  const sortedInitials = Object.keys(groupedContacts).sort();

  return (
    <div>
      <h2>Contact List</h2>
      <AddContactForm />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {sortedInitials.map((initial) => (
        <div key={initial}>
          <h3>{initial}</h3>
          <ul>
            {groupedContacts[initial].map((contact) => (
              <li key={contact.id}>
                <strong>{contact.name}</strong> — {contact.category}
                <div style={{ marginTop: "4px" }}>
                  <button onClick={() => setSelectedContact(contact)}>Edit</button>
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Are you sure you want to delete ${contact.name}?`
                      );
                      if (confirmed) {
                        removeContact(contact.id);
                      }
                    }}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedContact && (
        <EditContactModal
          isOpen={!!selectedContact}
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}
