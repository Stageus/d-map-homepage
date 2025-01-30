import styled, { keyframes } from "styled-components";

// 로딩 애니메이션 키프레임
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const STYLE = {
  ErrorContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
    text-align: center;
  `,
  BackButton: styled.button`
    color: ${({ theme }) => theme.blue};
  `,

  ErrorMessageBox: styled.div`
    display: flex;
    margin-top: 10px;
  `,
  EmptyMessage: styled.div`
    text-align: center;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    overflow: hidden;
  `,

  PostGrid: styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
    grid-auto-rows: calc((100vw - 16px) / 3); /* 가로 너비 기준 */
    width: 50%;
    height: calc(90vh - 150px);
    overflow-y: auto;
  `,
  TrackingContainer: styled.div`
    background-color: ${({ theme }) => theme.light_blue};
    text-align: center;
    position: relative; /* 버튼의 절대 위치 기준 */
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
  `,
  TrackingClickBox: styled.div`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.lignt_gray};
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    transition: all 0.2s ease;
  `,
  Loading: styled.div`
    width: 24px;
    height: 24px;
    border: 3px solid ${({ theme }) => theme.light_blue};
    border-top: 3px solid ${({ theme }) => theme.black};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  `,
  LoadingBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  LoadingContainer: styled.div`
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `,
};

export default STYLE;
