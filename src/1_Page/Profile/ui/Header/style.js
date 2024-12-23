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
    display: inline-block;
    color: gray;
    margin: 6px 0;
    font-size: 0.9rem;
  `,
  PostCount: styled.p`
    color: gray;
    font-size: 0.8rem;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
  `,

  Title: styled.h2`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,

  Button: styled.button`
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    ${({ $primary }) =>
      $primary
        ? `
    background-color: black;
    color: white;
  `
        : `
    background-color: #e0e0e0;
    color: #888;
  `}

    &:hover {
      opacity: 0.8;
    }
  `,
  ProfileWrapper: styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ddd;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

export default STYLE;
