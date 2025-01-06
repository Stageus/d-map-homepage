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
    overflow: auto;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
    grid-auto-rows: 1fr;
    flex-shrink: 0;
    width: 50%;
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
};

export default STYLE;
