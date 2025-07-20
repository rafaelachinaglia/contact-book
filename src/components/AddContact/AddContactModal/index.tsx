import Modal from "react-modal";
import { AddContactForm } from "../AddContactForm";
import { ModalTitle, customModalStyles } from "./styles";
import styled from "styled-components";

interface AddContactModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalContentWrapper = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

export function AddContactModal({ isOpen, onRequestClose }: AddContactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Contact Modal"
      style={customModalStyles}
    >
      <ModalContentWrapper>
        <ModalTitle>Novo Contato</ModalTitle>
        <AddContactForm onSuccess={onRequestClose} />
      </ModalContentWrapper>
    </Modal>
  );
}
