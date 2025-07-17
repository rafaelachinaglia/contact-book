import { useEffect, useState } from 'react';
import type { Contact } from '../types/Contact';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from '../services/contactService';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to fetch contacts.');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    const newContact = await createContact(contact);
    setContacts(prev => [...prev, newContact]);
  };

  const editContact = async (id: number, contact: Omit<Contact, 'id'>) => {
    const updated = await updateContact(id, contact);
    setContacts(prev =>
      prev.map(c => (c.id === id ? updated : c))
    );
  };

  const removeContact = async (id: number) => {
    await deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    editContact,
    removeContact
  };
}
