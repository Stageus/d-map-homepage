import styled from "styled-components";

const STYLE = {
  Main: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Header: styled.div`
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    min-height: 50px;
    align-items: end;
  `,
  Date: styled.h3`
    font-size: x-large;
    font-weight: bold;
  `,
  Sorting: styled.select`
    border: none;
    color: gray;
    outline: none;
  `
};

export default STYLE;
