import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
  `,

  Title: styled.h2`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,

  Button: styled.button`
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    ${({ $primary }) =>
      $primary
        ? `
      background-color: black;
      color: white;
    `
        : `
      background-color: #e0e0e0;
      color: #888;
    `}

    &:hover {
      opacity: 0.8;
    }
  `,
};

export default STYLE;
