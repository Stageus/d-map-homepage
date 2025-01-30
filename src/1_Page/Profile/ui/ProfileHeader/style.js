import styled from "styled-components";
const STYLE = {
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.lignt_gray};
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    width: 50%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    border-bottom: ${({ $active, theme }) =>
      $active ? `2px solid ${theme.black}` : "none"};
    color: ${({ $active, theme }) => ($active ? theme.black : theme.gray)};
  `,
  TabNone: styled.div`
    width: 100%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.blue};
  `,
};
export default STYLE;
