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
