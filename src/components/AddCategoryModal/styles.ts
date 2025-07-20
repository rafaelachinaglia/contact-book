import styled from "styled-components";

export const ModalOverlay = "ReactModal__Overlay";
export const ModalContainer = "ReactModal__Content";

export const ModalContent = styled.div`
  padding: 24px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 24px 16px;
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
  }
`;

export const ModalHeader = styled.div`
  margin-bottom: 16px;


`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  font-size: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 12px;
  }
`;

export const Button = styled.button<{ variant?: "cancel" }>`
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#f0f0f0" : "#61b448"};
  color: ${({ variant }) => (variant === "cancel" ? "#333" : "#fff")};
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.9;
  }
`;
