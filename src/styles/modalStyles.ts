import type { Styles } from "react-modal";

export const customModalStyles: Styles = {
  content: {
    inset: "50% auto auto 50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "0",
    border: "none",
    borderRadius: "16px",
    maxHeight: "90vh",
    maxWidth: "95vw",
    width: "540px",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
