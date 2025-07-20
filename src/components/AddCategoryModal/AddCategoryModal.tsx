import Modal from "react-modal";
import { ModalContent, ModalHeader, ModalTitle } from "./styles";
import { customModalStyles } from "../../styles/modalStyles";
import { CategoryForm } from "./CategoryForm";

interface AddCategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AddCategoryModal({ isOpen, onRequestClose }: AddCategoryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Adicionar Categoria"
      style={customModalStyles}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Nova Categoria</ModalTitle>
        </ModalHeader>
        <CategoryForm onSuccess={onRequestClose} isOpen={isOpen} />
      </ModalContent>
    </Modal>
  );
}
