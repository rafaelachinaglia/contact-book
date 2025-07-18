import { AddContactForm } from '../components/AddContactForm';
import { useContacts } from '../hooks/useContacts';


export function ContactsPage() {
  const { contacts, loading, error } = useContacts();

  return (
    <div>
      <h2>Contact List</h2>
      <AddContactForm />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> — {contact.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
