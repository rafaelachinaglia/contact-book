import { useState } from "react";
import Modal from "react-modal";
import { useCategories } from "../../hooks/useCategories";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  ModalTitle,
  Button,
} from "./styles";
import { customModalStyles } from "../../styles/modalStyles";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AddCategoryModal({ isOpen, onRequestClose }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const { addCategory } = useCategories();

  function handleAddCategory() {
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      toast.error("O nome da categoria é obrigatório.");
      return;
    }

    try {
      addCategory(trimmedName);
      toast.success("Categoria criada com sucesso!");
      setCategoryName("");
      onRequestClose();
    } catch (error) {
      toast.error("Erro ao adicionar categoria.");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category Modal"
      style={customModalStyles}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Nova Categoria</ModalTitle>
        </ModalHeader>
        <Input
          type="text"
          placeholder="Nome da Categoria"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <ModalFooter>
          <Button onClick={onRequestClose} variant="cancel">
            Cancelar
          </Button>
          <Button onClick={handleAddCategory}>Adicionar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
