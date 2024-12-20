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
    width: 320px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  `,
  ModalMessage: styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  `,
  ModalButton: styled.button`
    width: 120px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &.confirm {
      background-color: #000000;
      color: #ffffff;
    }

    &.cancel {
      background-color: #e0e0e0;
      color: #333333;
    }

    &:hover {
      opacity: 0.9;
    }
  `,
};

export default STYLE;
