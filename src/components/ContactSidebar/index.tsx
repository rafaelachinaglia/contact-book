// src/components/ContactSidebar/ContactSidebar.tsx
import { Notebook, BadgePlus } from "lucide-react";
import { Sidebar } from "./styles";

export interface ContactSidebarProps {
  contactCount: number;
}

export function ContactSidebar({ contactCount }: ContactSidebarProps) {
  return (
    <Sidebar className="glass">
      <div className="logo">
        <div className="icon-wrapper">
          <Notebook size={18} color="#fff" />
        </div>
        <h1>Contatos</h1>
      </div>
      <nav>
        <p>Todos os contatos ({contactCount})</p>
        <hr />
        <div className="group-wrapper">
          <span>Grupos</span>
          <BadgePlus size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <p>Colleagues (23)</p>
        <p>School & College (23)</p>
      </nav>
    </Sidebar>
  );
}
