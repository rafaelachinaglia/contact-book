import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Contact } from "../types/Contact";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contactService";

interface ContactsContextType {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  fetchContacts: () => void;
  addContact: (contact: Omit<Contact, "id">) => Promise<void>;
  editContact: (id: number, contact: Omit<Contact, "id">) => Promise<void>;
  removeContact: (id: number) => Promise<void>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError("Failed to fetch contacts.");
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, "id">) => {
    const newContact = await createContact(contact);
    setContacts((prev) => [...prev, newContact]);
  };

  const editContact = async (id: number, contact: Omit<Contact, "id">) => {
    const updated = await updateContact(id, contact);
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const removeContact = async (id: number) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        error,
        fetchContacts,
        addContact,
        editContact,
        removeContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts deve ser usado dentro de ContactsProvider");
  }
  return context;
}
