import styled from "styled-components";

const STYLE = {
  BodyContainer: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    top: 10vh;
    height: 80vh;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    position: relative;
    padding-left: 10px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  `,
  List: styled.ul`
    position: absolute;
    width: 90%;
    background-color: ${({ theme }) => theme.background};
  `,
  ListItem: styled.li`
    font-size: 14px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.gray};
    padding: 3px;
  `,
  ListBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
  ListDeleteButton: styled.button`
    height: 100%;
  `,
};

export default STYLE;
