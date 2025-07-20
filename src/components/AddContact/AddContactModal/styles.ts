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
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  @media (max-width: 600px) {
    padding: 16px 12px;
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;


