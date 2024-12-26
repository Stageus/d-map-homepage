import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 8px 0;
    margin-bottom: 16px;
  `,
  Input: styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
  `,
  Icon: styled.span`
    margin-left: 8px;
    font-size: 16px;
    cursor: pointer;
  `,
  List: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  ListItem: styled.li`
    font-size: 14px;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `,
};

export default STYLE;
