import styled from "styled-components";

const STYLE = {
  Main: styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
  `,
  ProfileContainer: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,
  UserInfo: styled.div`
    margin-left: 12px;
  `,
  UserName: styled.h1`
    font-size: 1.2rem;
    margin: 0;
  `,
  Nickname: styled.p`
    color: gray;
    margin: 4px 0;
    font-size: 0.9rem;
  `,
  PostCount: styled.p`
    color: gray;
    font-size: 0.8rem;
  `,
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
  `,
  PostGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr; /* 가로 열 크기를 기준으로 세로 행 크기를 맞춤 */
    gap: 8px;
  `,
  PostImage: styled.img`
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  `,
  EmptyMessage: styled.p`
    text-align: center;
    color: gray;
    margin-top: 20px;
    font-size: 0.9rem;
  `,
};

export default STYLE;
