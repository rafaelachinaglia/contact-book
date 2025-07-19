import styled from "styled-components";

export const customModalStyles = {
  content: {
    width: "500px",
    maxWidth: "90vw",
    inset: "50% auto auto 50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    padding: "24px 16px",
    backgroundColor: "#fff",
    overflow: "auto",
    maxHeight: "90vh",
    position: "relative" as const,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

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
`;

export const ModalTitle = styled.h2`
  margin-bottom: 24px;
  color: #61b448;
  text-align: center;
`;

export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

export const InfoGroup = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  grid-column: ${({ fullWidth }) => (fullWidth ? "span 2" : "auto")};
`;

export const InfoLabel = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const InfoInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }

  &:read-only {
    background-color: #f8f8f8;
  }
`;

export const InfoTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 16px;
  resize: none;

  &:read-only {
    background-color: #f8f8f8;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;

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
`;

export const CancelButton = styled.button`
  ${baseButtonStyles}
  background-color: #002655ff;
  color: white;
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
