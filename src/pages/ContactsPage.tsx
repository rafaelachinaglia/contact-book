import { useState } from "react";
import { AddContactForm } from "../components/AddContactForm";
import { EditContactModal } from "../components/EditContactModal";
import { useContacts } from "../hooks/useContacts";
import type { Contact } from "../types/Contact";

export function ContactsPage() {
  const { contacts, loading, error, removeContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const groupKey = contact.name[0].toUpperCase();
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(contact);
    return groups;
  }, {} as Record<string, Contact[]>);

  function highlightMatch(name: string, term: string) {
    if (!term) return name;

    const regex = new RegExp(`(${term})`, "ig");
    const parts = name.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: "#ffeaa7" }}>{part}</mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  }

  return (
    <div>
      <h2>Contact List</h2>
      <AddContactForm />

      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "16px 0", padding: "8px", width: "100%" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {Object.entries(groupedContacts).map(([category, contacts]) => (
        <div key={category} style={{ marginBottom: "24px" }}>
          <h3>{category}</h3>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <strong>{highlightMatch(contact.name, searchTerm)}</strong> — {contact.category}
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
