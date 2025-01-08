import styled from "styled-components";

const STYLE = {
  SliderWrapper: styled.div`
    width: 100%;
    overflow: hidden;
  `,
  Slider: styled.div`
    display: flex;
    justify-content: center;
    width: 200%; /* 두 개의 탭을 모두 포함할 넓이 */
    transform: translateX(${({ $tabIndex }) => -$tabIndex * 50}%);
    transition: transform 0.5s ease-in-out;
  `,
  PostGrid: styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
    grid-auto-rows: calc((100vw - 16px) / 3); /* 가로 너비 기준 */
    width: 50%;
    height: calc(90vh - 200px);
    overflow-y: auto;
  `,
  EmptyMessage: styled.p`
    text-align: center;
    color: ${({ theme }) => theme.gray};
    margin-top: 20px;
    font-size: 0.9rem;
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
  LoadingOverlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  Spinner: styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3); /* 배경 테두리 */
    border-radius: 50%;
    border-top-color: #ffffff; /* 메인 스피너 색상 */
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

export default STYLE;
