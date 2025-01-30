import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-height: ${({ $isFirstSearch }) => ($isFirstSearch ? "auto" : "400px")};
    overflow-y: ${({ $isFirstSearch }) =>
      $isFirstSearch ? "visible" : "auto"};
    padding: 30px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: ${({ $isFirstSearch }) =>
      $isFirstSearch ? "none" : "1px solid #ddd"};
    border-radius: ${({ $isFirstSearch }) => ($isFirstSearch ? "0" : "8px")};
    box-shadow: ${({ $isFirstSearch }) =>
      $isFirstSearch ? "none" : "0 4px 8px rgba(0, 0, 0, 0.1)"};
    height: 100%;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  `,

  List: styled.ul`
    position: absolute;
    width: 100%;
    height: 100%;
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
