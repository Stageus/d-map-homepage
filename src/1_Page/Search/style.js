import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
  `,

  List: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  ListItem: styled.li`
    font-size: 14px;
    margin-bottom: 8px;
    color: #bbbbbb;
    padding: 3px;
    cursor: pointer;
  `,
};

export default STYLE;
