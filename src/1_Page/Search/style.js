import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  `,

  List: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.background};
    border-radius: 5px;
  `,
  ListItem: styled.li`
    font-size: 14px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.gray};
    padding: 3px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.light_blue};
      color: ${({ theme }) => theme.white};
    }
  `,
};

export default STYLE;
