import Modal from "react-modal";
import { AddContactForm } from "../AddContactForm";
import { ModalTitle, ModalContentWrapper } from "./styles"; // adicionamos ModalContentWrapper
import { customModalStyles } from "../../../styles/modalStyles";

interface AddContactModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AddContactModal({ isOpen, onRequestClose }: AddContactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Contact Modal"
      style={customModalStyles}
      ariaHideApp={false}
    >
      <ModalContentWrapper>
        <ModalTitle>Novo Contato</ModalTitle>
        <AddContactForm onSuccess={onRequestClose} />
      </ModalContentWrapper>
    </Modal>
  );
}
