import styled from "styled-components";

const STYLE = {
  TrackingContainer: styled.div`
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    width: 100%;
  `,

  TrackingClickBox: styled.div`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.lignt_gray};
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
    border: 2px solid ${({ theme }) => theme.lignt_gray};
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 8px; /* 상단 여백 */
    right: 8px; /* 우측 여백 */
    transition: all 0.2s ease;

    &:checked {
      background-color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.blue};
    }
  `,
};

export default STYLE;
