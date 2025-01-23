import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: fixed;
    width: 90vw;
    height: 8vh;
    top: 0;
    background-color: ${({ theme }) => theme.background};
  `,
  InputContainer: styled.div`
    display: flex;
    width: 100%;
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
    color: #666;
    cursor: pointer;
    margin-left: 8px;
  `,
  ErrorMessage: styled.div`
    height: 10px;
    color: ${({ theme }) => theme.red};
    font-size: 12px;
    margin: 5px;
    margin-left: 10px;
  `,
};

export default STYLE;
