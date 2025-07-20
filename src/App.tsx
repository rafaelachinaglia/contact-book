import { ToastContainer } from "react-toastify";
import { ContactsPage } from "./pages/ContactsPage";

function App() {
  return (
    <div>
      <ContactsPage />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
