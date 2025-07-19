import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DoubleColumn = styled(FieldGroup)`
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
  font-size: 16px;

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
`;
