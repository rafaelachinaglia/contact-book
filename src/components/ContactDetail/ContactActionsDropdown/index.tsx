import { DropdownContainer } from "./styles";

interface ContactActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactActionsDropdown({
  onEdit,
  onDelete,
}: ContactActionsDropdownProps) {
  return (
    <DropdownContainer className="dropdown">
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Deletar</button>
    </DropdownContainer>
  );
}
