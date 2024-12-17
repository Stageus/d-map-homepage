import styled from "styled-components";

const STYLE = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1000;
  `,

  Sheet: styled.div`
    background: #ffffff;
    width: 100%;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 100%; /* 시트의 아래쪽부터 시작 */
      left: 0;
      width: 100%;
      height: 100vh; /* 화면 전체 높이 */
      background-color: #ffffff;
    }

    &.open {
      transition: transform 0.3s ease-out;
      transform: translateY(0);
    }

    &.close {
      transition: transform 0.2s ease-out;
      transform: translateY(100%);
    }
  `,

  Handle: styled.div`
    width: 50px;
    height: 5px;
    background: #ccc;
    border-radius: 10px;
    margin: 10px auto;
    cursor: grab;
  `,
};

export default STYLE;
