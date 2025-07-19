import styled from "styled-components";

export const SearchAndAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 250px;

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
  }

  input {
    padding-left: 36px;
  }
`;

export const SearchBar = styled.input`
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  width: 250px;
  outline: none;
  border-color: #61b448ff;
`;

export const AddContactButton = styled.button`
  background-color: #61b448ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  border: 1px solid #61b448ff;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    color: #61b448ff;
    border: 1px solid #61b448ff;

    svg {
      color: #61b448;
    }
  }

  svg {
    flex-shrink: 0;
  }
`;
