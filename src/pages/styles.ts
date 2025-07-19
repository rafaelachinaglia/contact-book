import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f6f6f6;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
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

  div {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
`;

export const ContactList = styled.div`
  margin-top: 30px;
`;

export const ContactGroup = styled.div`
  margin-bottom: 24px;

  h3 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #555;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`;

export const ContactListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ContactName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const ContactTag = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #eee;
  color: #333;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
`;
