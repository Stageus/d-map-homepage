import styled from "styled-components";

const STYLE = {
  ProfileContainer: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 16px;
  `,
  UserInfo: styled.div`
    width: 100%;
    margin-left: 12px;
  `,
  ProfileBox: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  ProfileButton: styled.button`
    background-color: white;
    outline: none;
    border: none;
    cursor: pointer;
  `,
  UserName: styled.h1`
    font-size: 1.2rem;
    margin: 0;
  `,
  Nickname: styled.p`
    color: gray;
    margin: 6px 0;
    font-size: 0.9rem;
  `,
  PostCount: styled.p`
    color: gray;
    font-size: 0.8rem;
  `,
};

export default STYLE;
