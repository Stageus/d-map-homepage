import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    padding: 16px;
  `,
  TabContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
  `,
  TabBox: styled.div`
    position: relative;
    width: 80%;
    display: flex;
    border-radius: 25px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.blue};
    height: 40px;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `,
  TabBackground: styled.div`
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: ${({ $activeTabName }) => ($activeTabName ? "5px" : "50%")};
    width: calc(50% - 10px);
    background-color: ${({ theme }) => theme.white};
    border-radius: 20px;
    transition: all 0.3s ease-in-out; /* 애니메이션 효과 */
  `,
  Tab: styled.button`
    flex: 1;
    z-index: 1; /* 배경 위에 보이도록 설정 */
    padding: 10px 0;
    background-color: transparent;
    color: ${({ active, theme }) => (active ? theme.blue : theme.white)};
    transition: all 0.3s ease-in-out; /* 애니메이션 효과 */
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  `,
  ResultList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  ResultItem: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 8px;

    .profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.light_gray};
    }

    button {
      margin-left: auto;
      background: none;
      border: none;
      color: ${({ theme }) => theme.gray};
      cursor: pointer;
    }
  `,
  EmptyMessage: styled.div`
    text-align: center;
    color: ${({ theme }) => theme.gray};
  `,
  MapPreview: styled.div`
    border: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
    }

    div {
      padding: 8px;
      background-color: ${({ theme }) => theme.light_gray};
      font-weight: bold;
    }
  `,
};

export default STYLE;
