import styled, { keyframes } from "styled-components";

// 모달 애니메이션
const growCenter = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// 스타일 객체
const STYLE = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `,
  ModalContent: styled.div`
    background: white;
    width: 90%;
    height: 95vh;
    max-width: 400px;
    overflow-y: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${growCenter} 0.3s ease-out forwards;
    transform-origin: center;
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    color: #333;
  `,
  OpenButton: styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  `,
};

export default STYLE;
