import styled from "styled-components";

const STYLE = {
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.lignt_gray};
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    width: 50%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    border-bottom: ${({ $active, theme }) =>
      $active ? `2px solid ${theme.black}` : "none"};
    color: ${({ $active, theme }) => ($active ? theme.black : theme.gray)};
  `,
  TabNone: styled.div`
    width: 100%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.blue};
  `,
  ProfileContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 16px 0;
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
  Container: styled.div`
    display: flex;
    height: 55px;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
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

    ${({ $primary, theme }) =>
      $primary
        ? `
    background-color: ${theme.black};
    color: ${theme.white};
  `
        : `
    background-color: ${theme.lignt_gray};
    color: ${theme.white};
  `}

    &:hover {
      opacity: 0.8;
    }
  `,
  ProfileWrapper: styled.div`
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    overflow: hidden; /* 이미지가 부모 크기를 초과할 경우 숨김 */
    border-radius: 50%; /* 부모 요소도 원형으로 만듦 */
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
  `,
};

export default STYLE;
