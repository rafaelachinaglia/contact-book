import styled from "styled-components";

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px 24px;

  @media (max-width: 600px) {
    padding: 24px 16px;
    padding-bottom: 48px;
    max-height: calc(100vh - 40px);
  }
`;

export const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(15deg, #61b448, #307032ff);
  color: white;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCategory = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  grid-column: ${({ fullWidth }) => (fullWidth ? "span 2" : "auto")};
`;

export const InfoLabel = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const InfoInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
  }

  &:read-only {
    background-color: #f8f8f8;
  }

  width: 100%;
`;

export const InfoTextarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 14px;
  resize: none;

  &:read-only {
    background-color: #f8f8f8;
  }

  width: 100%;
`;

export const InfoSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 14px;
  background-color: white;

  &:disabled {
    background-color: #f8f8f8;
  }

  &:focus {
    border-color: #61b448;
  }

  width: 100%;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const baseButtonStyles = `
  flex: 1;
  padding: 8px 12px;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SaveButton = styled.button`
  ${baseButtonStyles}
  background-color: #61b448;
  color: white;
    &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled.button`
  ${baseButtonStyles}
  background-color: #002655ff;
  color: white;

    &:hover {
    opacity: 0.9;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #61b448;
  cursor: pointer;
  padding: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const TrashButton = styled.button`
  ${baseButtonStyles}
  background-color: #c0392b;
  color: white;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const CloseButton = styled(CancelButton)``;
