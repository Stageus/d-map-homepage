import styled from "styled-components";

const STYLE = {
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 8px 0;
    width: 100%;
  `,
  Input: styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 0 8px;
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
    margin-top: 5px;
    min-height: 20px;
    padding: 3px;
  `,
};

export default STYLE;
