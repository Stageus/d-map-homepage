import styled from "styled-components";
const STYLE = {
  Main: styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
  `,
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    width: 50%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
  `,
  TabNone: styled.div`
    width: 100%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid black;
  `,
};

export default STYLE;
