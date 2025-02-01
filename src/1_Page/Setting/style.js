import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  `,
  Header: styled.div`
    width: 80%;
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
  `,
  HeaderTitle: styled.p`
    margin: 20px 0;
    width: 100%;
    color: ${({ theme }) => theme.text};
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
    background-color: ${({ theme }) => theme.black};
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
    transition: all 0.3s ease-in-out;
  `,
  Tab: styled.button`
    flex: 1;
    padding: 10px 0;
    background-color: transparent;
    color: ${({ $active, theme }) => ($active ? theme.black : theme.white)};
    transition: all 0.3s ease-in-out;
    border: none;
    font-size: 16px;
    font-weight: bold;
    z-index: 1;
  `,
  ButtonContainer: styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Button: styled.button`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: ${({ danger, theme }) =>
      danger ? `1px solid ${theme.red}` : "none"};
    border-radius: 5px;
    background-color: ${({ danger, theme }) =>
      danger ? "transparent" : theme.black};
    color: ${({ danger, theme }) => (danger ? theme.red : theme.white)};
    font-size: 16px;
    cursor: pointer;
  `,
  Footer: styled.div`
    margin-top: auto;
    text-align: center;
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 20px;
  `,
  ButtonBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  BackButton: styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${({ theme }) => theme.black};
    border-radius: 5px;
    background-color: transparent;
    color: ${({ theme }) => theme.black};
    cursor: pointer;
  `,
};

export default STYLE;
