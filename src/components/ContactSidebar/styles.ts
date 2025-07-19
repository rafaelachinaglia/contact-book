import styled from "styled-components";

export const Sidebar = styled.aside`
  width: 250px;
  background-color: #002655ff;
  color: white;
  padding: 30px 20px;

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;

    .icon-wrapper {
      background-color: #61b448ff;
      border-radius: 50%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      margin: 0;
      line-height: 1;
    }
  }

  nav {
    p {
      margin: 10px 0;
      cursor: pointer;
      padding: 6px 0;
      transition: color 0.3s;

      &:hover {
        color: #d1c4e9;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background-color: #fff;
      margin: 20px 0;
      opacity: 0.3;
    }

    .group-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 10px 5px 10px 0px;
      font-weight: 500;

      span {
        font-weight: 600;
      }

      p {
        margin: 0;
      }

      svg {
        flex-shrink: 0;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #d1c4e9;
        }
      }
    }
  }
`;
