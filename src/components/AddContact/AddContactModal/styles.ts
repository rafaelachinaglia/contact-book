import styled from "styled-components";
import type { Styles } from "react-modal";

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const customModalStyles: Styles = {
  content: {
    maxWidth: "520px",
    margin: "auto",
    borderRadius: "12px",
    padding: "24px 28px",
    border: "none",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    inset: "unset", // remove posicionamento padrão do react-modal
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
};
