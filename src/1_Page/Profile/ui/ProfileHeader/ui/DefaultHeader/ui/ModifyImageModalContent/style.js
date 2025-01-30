import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.white};
  `,
  Title: styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
  `,
  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.profile_background};
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
  `,
  PhotoButton: styled.button`
    width: 150px;
    padding: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.lignt_gray};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.gray};
    }
  `,
  EditButton: styled.button`
    width: 150px;
    padding: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.blue};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.deep_blue};
    }
  `,
};

export default STYLE;
