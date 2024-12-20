import styled from "styled-components";

const STYLE = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); // 반투명 배경
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `,
  ModalContent: styled.div`
    background: #ffffff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  `,
  ModalMessage: styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  `,
  ModalButton: styled.button`
    background-color: #000000;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333333;
    }
  `,
};

export default STYLE;
