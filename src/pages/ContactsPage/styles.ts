import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f6f6f6;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #61b448ff;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    margin-top: 32px;
  }
`;


export const ContactList = styled.div`
  margin-top: 30px;

  @media (max-width: 768px) {
    padding-bottom: 32px;
  }
`;

export const ContactCategory = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 16px;
    }
  }
`;

export const ContactListItem = styled.li`
  padding: 16px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
  }

  .card-top-row {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .card-bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;


export const ContactName = styled.span`
  font-weight: 600;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }
`;

export const ContactTag = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const FloatingAddButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 24px;
    right: 24px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #61b448ff;
    border: none;
    align-items: center;
    justify-content: center;
    z-index: 20;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;



