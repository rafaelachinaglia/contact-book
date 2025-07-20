import Modal from "react-modal";
import { AddContactForm } from "../AddContactForm";
import { ModalTitle } from "./styles";
import { customModalStyles } from "../../ViewContactModal/styles";

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
    >
      <ModalTitle>Novo Contato</ModalTitle>
      <AddContactForm onSuccess={onRequestClose} />
    </Modal>
  );
}
