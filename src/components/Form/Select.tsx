import styled from "styled-components";

export const Select = styled.select<{ disabled?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 16px;
  background-color: white;

  &:disabled {
    background-color: #f8f8f8;
  }

  &:focus {
    border-color: #61b448;
  }
`;
