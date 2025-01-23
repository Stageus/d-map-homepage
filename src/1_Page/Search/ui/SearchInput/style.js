import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: fixed;
    width: 100vw;
    height: 10vh;
    top: 0;
    background-color: ${({ theme }) => theme.background};
  `,
  InputContainer: styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    margin: 10px;
    border-bottom: 1px solid
      ${({ theme, $isError }) => ($isError ? theme.red : theme.grey)};
  `,
  Input: styled.input`
    width: 80%;
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 10px;
  `,
  Icon: styled.span`
    font-size: 18px;
    margin-left: 8px;
  `,
  ErrorMessage: styled.div`
    height: 10px;
    color: ${({ theme }) => theme.red};
    font-size: 12px;
    margin-left: 10px;
  `,
};

export default STYLE;
