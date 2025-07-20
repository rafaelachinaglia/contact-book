import { BadgePlus, Search } from "lucide-react";
import {
  SearchBar,
  SearchInputWrapper,
  SearchAndAddContainer,
  AddContactButton,
} from "./styles";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddContact: () => void;
}

export function SearchAndAddBar({ searchTerm, setSearchTerm, onAddContact }: Props) {
  const isMobile = useIsMobile();

  return (
    <SearchAndAddContainer>
      <SearchInputWrapper>
        <Search size={18} />
        <SearchBar
          type="text"
          placeholder="Digite um nome para busca"
          aria-label="Buscar contato pelo nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchInputWrapper>

      {!isMobile && (
        <AddContactButton onClick={onAddContact}>
          <span>Novo Contato</span>
          <BadgePlus size={18} strokeWidth={2.5} />
        </AddContactButton>
      )}
    </SearchAndAddContainer>
  );
}
