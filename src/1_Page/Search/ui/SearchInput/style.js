import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 10vh;
    background-color: ${({ theme }) => theme.background};
  `,

  Box: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid
      ${({ theme, $isError }) => ($isError ? "red" : theme.border || "#ddd")};
    border-radius: 24px;
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  `,

  InputContainer: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `,

  Input: styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 8px;
    color: ${({ theme }) => theme.text || "#333"};
    background-color: transparent;
  `,

  Icon: styled.div`
    font-size: 20px;
    color: #888;
    cursor: pointer;
  `,

  InputContainerInSearchHisoty: styled.div`
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
  `,

  SearchHistoryContainer: styled.div`
    width: 100%;
    position: relative;
    top: 10vh;
    background-color: ${({ theme }) => theme.background};
    border-radius: 8px;
    padding: 10px;
  `,

  List: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  ListItem: styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 1px solid #eee;

    &:hover {
      background-color: #f0f0f0;
    }
  `,

  LeftSection: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;

    & .icon {
      font-size: 18px;
      color: #666;
    }
  `,

  SearchText: styled.span`
    flex-grow: 1;
    color: #333;
  `,

  RightSection: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    & .date {
      font-size: 14px;
      color: #999;
    }

    & .delete {
      font-size: 18px;
      color: red;
      cursor: pointer;
    }
  `,

  EmptyMessage: styled.div`
    padding: 12px 20px;
    color: #999;
    font-size: 14px;
  `,
  // Container: styled.div`
  //   position: fixed;
  //   width: 100vw;
  //   height: 10vh;
  //   top: 0;
  //   background-color: ${({ theme }) => theme.background};
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // `,
  // InputContainer: styled.div`
  //   display: flex;
  //   width: 90%;
  //   align-items: center;
  //   border-bottom: 1px solid
  //     ${({ theme, $isError }) => ($isError ? theme.red : theme.grey)};
  // `,
  // Input: styled.input`
  //   width: 80%;
  //   flex: 1;
  //   border: none;
  //   outline: none;
  //   font-size: 16px;
  //   padding: 10px;
  // `,
  // Icon: styled.span`
  //   font-size: 18px;
  //   margin-left: 8px;
  // `,
  ErrorMessage: styled.div`
    color: ${({ theme }) => theme.red};
    font-size: 12px;
    margin-left: 10px;
  `,
  ErrorContainer: styled.div`
    width: 90%;
    display: flex;
    justify-self: start;
    align-items: center;
  `,

  // SearchHistoryContainer: styled.div`
  //   width: 100%;
  //   height: calc(90vh - 100px);
  //   position: relative;
  //   top: 10vh;
  //   overflow-y: auto;
  //   padding: 20px;
  //   background-color: ${({ theme }) => theme.background};
  //   color: ${({ theme }) => theme.text};
  //   border: none;
  //   border-radius: 0;
  //   box-shadow: none;
  // `,

  // List: styled.ul`
  //   width: 100%;
  //   height: 100%;
  //   background-color: ${({ theme }) => theme.background};
  // `,
  // ListItem: styled.li`
  //   font-size: 14px;
  //   margin-bottom: 8px;
  //   color: ${({ theme }) => theme.gray};
  //   padding: 3px;
  // `,
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
