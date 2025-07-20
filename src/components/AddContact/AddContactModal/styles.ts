import styled from "styled-components";

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  font-weight: 500;

  @media (min-width: 601px) {
    margin-bottom: 20px;
  }
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px 24px;

  @media (max-width: 600px) {
    padding: 24px 16px;
    max-height: calc(100vh - 40px);
    padding-bottom: 48px;
  }
`;


