import type { Styles } from "react-modal";

export const customModalStyles: Styles = {
  content: {
    maxWidth: "500px",
    width: "90vw",
    height: "90vh",
    margin: "auto",
    borderRadius: "12px",
    padding: "0",
    inset: "unset",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
};
