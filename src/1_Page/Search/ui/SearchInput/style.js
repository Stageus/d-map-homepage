import styled from "styled-components";

const STYLE = {
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
    border-bottom: 1px solid #ccc;
  `,
  Input: styled.input`
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
    color: red;
    font-size: 12px;
    margin: 10px;
    margin-bottom: auto;
  `,
};

export default STYLE;
