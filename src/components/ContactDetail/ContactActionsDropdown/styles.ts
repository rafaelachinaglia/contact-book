import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 120px;
  padding: 8px 0;

  button {
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    padding: 8px 16px;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;
