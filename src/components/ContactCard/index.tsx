import { Phone, MapPin, MoreVertical, Tag } from "lucide-react";
import { highlightMatch } from "../../utils/highlightMatch";
import type { Contact } from "../../types/Contact";
import {
  ContactItem,
  CategoryTag,
  ContactActions,
  ContactField,
} from "./styles";
import { ContactActionsDropdown } from "../ContactDetail/ContactActionsDropdown";

export interface ContactCardProps {
  contact: Contact;
  searchTerm: string;
  isOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface ContactInfoLineProps {
  icon: React.ReactNode;
  value: string;
}

function ContactInfoLine({ icon, value }: ContactInfoLineProps) {
  return (
    <ContactField>
      {icon}
      <span>{value || "-"}</span>
    </ContactField>
  );
}

export function ContactCard({
  contact,
  searchTerm,
  isOpen,
  onToggleMenu,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const phoneValue = contact.phones?.join(", ") || "";
  const addressValue = contact.addresses?.join(", ") || "";

  return (
    <ContactItem>
      <strong>{highlightMatch(contact.name, searchTerm)}</strong>

      <CategoryTag>
        <Tag size={14} />
        {contact.category}
      </CategoryTag>

      <ContactInfoLine
        icon={<Phone size={14} color="#61b448ff" />}
        value={phoneValue}
      />

      <ContactInfoLine
        icon={<MapPin size={14} color="#61b448ff" />}
        value={addressValue}
      />

      <ContactActions>
        <button className="menu-button" onClick={onToggleMenu}>
          <MoreVertical size={18} />
        </button>
        {isOpen && (
          <ContactActionsDropdown onEdit={onEdit} onDelete={onDelete} />
        )}
      </ContactActions>
    </ContactItem>
  );
}
