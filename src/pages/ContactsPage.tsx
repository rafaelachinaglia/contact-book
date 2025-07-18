import { useState } from 'react';
import { AddContactForm } from '../components/AddContactForm';
import { EditContactModal } from '../components/EditContactModal';
import { useContacts } from '../hooks/useContacts';
import type { Contact } from '../types/Contact';

export function ContactsPage() {
  const { contacts, loading, error, removeContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <div>
      <h2>Contact List</h2>
      <AddContactForm />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> — {contact.category}
            <div style={{ marginTop: '4px' }}>
              <button onClick={() => setSelectedContact(contact)}>Edit</button>
              <button onClick={() => removeContact(contact.id)} style={{ marginLeft: '8px' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

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
