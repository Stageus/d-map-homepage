import styled from "styled-components";

const STYLE = {
  SliderWrapper: styled.div`
    overflow: hidden; /* 슬라이더 영역 외부 콘텐츠 숨기기 */
    width: 100%;
  `,
  Slider: styled.div`
    display: flex;
    width: 200%; /* 두 개의 탭을 모두 포함할 넓이 */
    transform: translateX(${({ $tabIndex }) => -$tabIndex * 50}%);
    transition: transform 0.5s ease-in-out; /* 부드러운 슬라이드 애니메이션 */
  `,
  PostGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 8px;
    width: 50%;
    flex-shrink: 0;
  `,
  EmptyMessage: styled.p`
    text-align: center;
    color: gray;
    margin-top: 20px;
    font-size: 0.9rem;
  `,
  TrackingContainer: styled.div`
    background-color: lightblue;
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
    border: 2px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 8px; /* 상단 여백 */
    right: 8px; /* 우측 여백 */
    transition: all 0.2s ease;
  `,
  TrackingCheckbox: styled.input.attrs({ type: "checkbox" })`
    z-index: 10000;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 8px; /* 상단 여백 */
    right: 8px; /* 우측 여백 */
    transition: all 0.2s ease;

    &:checked {
      background-color: #007bff;
      border-color: #007bff;
    }
  `,
};

export default STYLE;
