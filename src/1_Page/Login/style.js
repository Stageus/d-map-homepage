import styled from "styled-components";

const STYLE = {
  LoginPageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    gap: 8px;
  `,
  LoginBtnContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
  `
  ,
  LoginBtn: styled.button`
    width: 124px;
    height: 36px;
    border-radius: 4px;
    box-shadow: 1px 1px 2px black;
    background-color: ${({ theme }) => theme.blue};
    color: white;
  `
};

export default STYLE;
