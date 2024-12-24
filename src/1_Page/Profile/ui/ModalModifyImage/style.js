import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  Title: styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #000;
  `,
  ProfileImage: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #e0e7ff;
  `,
  PhotoButton: styled.button`
    width: 150px;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background-color: #b0b0b0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #a0a0a0;
    }
  `,
  EditButton: styled.button`
    width: 150px;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  `,
};

export default STYLE;
