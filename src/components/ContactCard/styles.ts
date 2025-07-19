import styled from "styled-components";

export const ContactItem = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.2fr 1.5fr auto;
  align-items: center;
  gap: 12px;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);

  strong {
    font-size: 1rem;
  }
`;

export const CategoryTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #edededff;
  color: #333;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 12px;
  line-height: 1;
  white-space: nowrap;
  width: fit-content;
  max-width: max-content;

  svg {
    width: 14px;
    height: 14px;
    color: #888;
    flex-shrink: 0;
  }
`;

export const ContactActions = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 8px;

  .menu-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
`;

export const ContactField = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #555;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover svg {
    color: #61b448ff;
  }
`;
