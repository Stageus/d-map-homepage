import styled from "styled-components";
const STYLE = {
  Main: styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
  `,
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    width: 50%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
  `,
  TabNone: styled.div`
    width: 100%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid black;
  `,
  SliderWrapper: styled.div`
    overflow: hidden; /* 슬라이더 영역 외부 콘텐츠 숨기기 */
    width: 100%;
  `,
  Slider: styled.div`
    display: flex;
    width: 200%; /* 두 개의 탭을 모두 포함할 넓이 */
    transform: translateX(${({ tabIndex }) => -tabIndex * 50}%);
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
};

export default STYLE;
