import Modal from "react-modal";
import { AddContactForm } from "./AddContactForm";

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
      style={{
        content: {
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <h2>New Contact</h2>
      <AddContactForm onSuccess={onRequestClose} />
    </Modal>
  );
}
