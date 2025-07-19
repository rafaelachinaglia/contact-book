import { Phone, MapPin, MoreVertical, Tag, Copy } from "lucide-react";
import { highlightMatch } from "../../utils/highlightMatch";
import type { Contact } from "../../types/Contact";
import {
  ContactItem,
  CategoryTag,
  ContactActions,
  ContactField,
  CopyButton,
} from "./styles";
import { ContactActionsDropdown } from "../ContactDetail/ContactActionsDropdown";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export interface ContactCardProps {
  contact: Contact;
  searchTerm: string;
  isOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({
  contact,
  searchTerm,
  isOpen,
  onToggleMenu,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const { copiedField, handleCopy } = useCopyToClipboard();

  return (
    <ContactItem>
      <strong>{highlightMatch(contact.name, searchTerm)}</strong>
      <CategoryTag>
        <Tag size={14} />
        {contact.category}
      </CategoryTag>
      <ContactField>
        <Phone size={14} color="#61b448ff" />
        <span>{contact.phones?.length ? contact.phones.join(", ") : "-"}</span>
        {contact.phones?.length > 0 && (
          <CopyButton
            onClick={() => handleCopy(contact.phones.join(", "), "phone")}
            title="Copiar telefone"
          >
            <Copy
              size={12}
              color={copiedField === "phone" ? "#61b448" : "#888888"}
            />
          </CopyButton>
        )}
      </ContactField>

      <ContactField>
        <MapPin size={14} color="#61b448ff" />
        <span>
          {contact.addresses?.length ? contact.addresses.join(", ") : "-"}
        </span>
        {contact.addresses?.length > 0 && (
          <CopyButton
            onClick={() => handleCopy(contact.addresses.join(", "), "address")}
            title="Copiar endereço"
          >
            <Copy
              size={12}
              color={copiedField === "address" ? "#61b448" : "#888888"}
            />
          </CopyButton>
        )}
      </ContactField>
      <ContactActions className="dropdown-wrapper">
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
