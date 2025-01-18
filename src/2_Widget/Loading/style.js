import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const STYLE = {
  LoadingContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 10000;
  `,
  Spinner: styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid ${({ theme }) => theme.blue};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  `,
  LoadingMessage: styled.div`
    margin-top: 20px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.gray};
  `,
};

export default STYLE;
