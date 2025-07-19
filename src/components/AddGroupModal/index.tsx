import { useState } from "react";
import Modal from "react-modal";
import { useCategories } from "../../hooks/useCategories";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  Button,
} from "./styles";
import { customModalStyles } from "../../styles/modalStyles";

interface AddGroupModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AddGroupModal({ isOpen, onRequestClose }: AddGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const { addCategory } = useCategories();

  function handleAddGroup() {
    if (!groupName.trim()) return;
    addCategory(groupName.trim());
    setGroupName("");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Group Modal"
      style={customModalStyles}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Novo Grupo</ModalTitle>
        </ModalHeader>
        <Input
          type="text"
          placeholder="Nome do grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <ModalFooter>
          <Button onClick={onRequestClose} variant="cancel">
            Cancelar
          </Button>
          <Button onClick={handleAddGroup}>Adicionar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
