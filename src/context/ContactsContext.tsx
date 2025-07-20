import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Contact } from "../types/Contact";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contactService";
import { toast } from "react-toastify";

interface ContactsContextType {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  fetchContacts: () => void;
  addContact: (contact: Omit<Contact, "id">) => Promise<void>;
  editContact: (id: number, contact: Omit<Contact, "id">) => Promise<void>;
  removeContact: (id: number) => Promise<void>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
      setError("Erro ao buscar contatos.");
      toast.error("Erro ao carregar contatos.");
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, "id">) => {
    try {
      const newContact = await createContact(contact);
      setContacts((prev) => [...prev, newContact]);
      toast.success("Contato adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar contato:", err);
      toast.error("Erro ao adicionar contato.");
    }
  };

  const editContact = async (id: number, contact: Omit<Contact, "id">) => {
    try {
      const updated = await updateContact(id, contact);
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast.success("Contato atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar contato:", err);
      toast.error("Erro ao atualizar contato.");
    }
  };

  const removeContact = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success("Contato removido com sucesso!");
    } catch (err) {
      console.error("Erro ao remover contato:", err);
      toast.error("Erro ao remover contato.");
    }
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
