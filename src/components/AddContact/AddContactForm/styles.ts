import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding-inline: 8px;
  }
`;

export const FieldCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`;

export const DoubleColumn = styled(FieldCategory)`
  grid-column: span 2;

  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: solid 1px #61b448;
  }
  &::placeholder {
    color: #aaa;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

export const AddButton = styled.button`
  margin-top: 8px;
  align-self: flex-start;
  background: none;
  border: none;
  color: #61b448;
  font-weight: bold;
  cursor: pointer;
`;

export const ButtonRow = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    grid-column: span 1;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px;
  background-color: #61b448;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #61b448ff;

    &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px;
  background-color: #002b5b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;

    &:hover {
    opacity: 0.9;
  }
`;

export const ModalContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  @media (max-width: 600px) {
    padding: 16px 12px;
    max-height: 80vh; 
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8d7da;
    color: #b02a37;
  }
`;



