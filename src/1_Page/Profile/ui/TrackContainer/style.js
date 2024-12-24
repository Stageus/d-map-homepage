import styled from "styled-components";

const STYLE = {
  TrackingContainer: styled.div`
    background-color: lightblue;
    text-align: center;
    position: relative; /* 버튼의 절대 위치 기준 */
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
  `,
  TrackingCheckbox: styled.div`
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
