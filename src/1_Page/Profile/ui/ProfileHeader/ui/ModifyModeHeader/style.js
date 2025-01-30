import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    height: 55px;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
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

    ${({ $primary, theme }) =>
      $primary
        ? `
      background-color: ${theme.black};
      color: ${theme.white};
    `
        : `
      background-color: ${theme.lignt_gray};
      color: ${theme.white};
    `}

    &:hover {
      opacity: 0.8;
    }
  `,
};

export default STYLE;
