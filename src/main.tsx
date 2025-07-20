import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { CategoriesProvider } from "./context/CategoriesContext.tsx";
import { ContactsProvider } from "./context/ContactsContext.tsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CategoriesProvider>
        <ContactsProvider>
          <App />
        </ContactsProvider>
      </CategoriesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
