import { useContacts } from '../hooks/useContacts';

export function ContactsPage() {
  const { contacts, loading, error } = useContacts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Contact List</h2>
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
