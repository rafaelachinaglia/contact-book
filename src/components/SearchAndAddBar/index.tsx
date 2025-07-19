import { BadgePlus, Search } from "lucide-react";
import { SearchBar } from "./SearchAndAddBar.styles";
import { SearchInputWrapper, SearchAndAddContainer } from "./SearchAndAddBar.styles";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddContact: () => void; // ← Adicione isso!
}

export function SearchAndAddBar({ searchTerm, setSearchTerm, onAddContact }: Props) {
  return (
    <SearchAndAddContainer>
      <SearchInputWrapper>
        <Search size={18} />
        <SearchBar
          type="text"
          placeholder="Digite um nome para busca"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchInputWrapper>

      <button
        style={{
          backgroundColor: "#61b448ff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "25px",
          cursor: "pointer",
          borderColor: "#61b448ff",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "42px",
        }}
        onClick={onAddContact}
      >
        <span>Novo Contato</span>
        <BadgePlus size={18} strokeWidth={2.5} />
      </button>
    </SearchAndAddContainer>
  );
}
