import styled from "styled-components";
const STYLE = {
  ProfileContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 16px 0;
  `,
  ProfileWrapper: styled.div`
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    overflow: hidden;
    border-radius: 50%;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
  `,
  UserInfo: styled.div`
    width: 80%;
  `,
  ProfileBox: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  ProfileButton: styled.button`
    background-color: ${({ theme }) => theme.white};
    outline: none;
    border: none;
    cursor: pointer;
  `,
  UserName: styled.h1`
    font-size: 1.2rem;
    margin: 0;
  `,
  Nickname: styled.p`
    display: inline-block;
    color: ${({ theme }) => theme.gray};
    margin: 6px 0;
    font-size: 0.9rem;
  `,
  PostCount: styled.p`
    color: ${({ theme }) => theme.gray};
    font-size: 0.8rem;
  `,
};

export default STYLE;
