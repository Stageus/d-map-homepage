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
  TabMenu: styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.lignt_gray};
    margin-bottom: 16px;
  `,
  Tab: styled.div`
    width: 50%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    border-bottom: ${({ $active, theme }) =>
      $active ? `2px solid ${theme.black}` : "none"};
    color: ${({ $active, theme }) => ($active ? theme.black : theme.gray)};
  `,
  TabNone: styled.div`
    width: 100%;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.blue};
  `,
  PostGrid: styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
    grid-auto-rows: calc((100vw - 16px) / 3); /* 가로 너비 기준 */
    width: 100%;
    height: calc(90vh - 150px);

    overflow-y: auto;
  `,
  EmptyMessage: styled.p`
    text-align: start;
    color: ${({ theme }) => theme.gray};
    width: 100%;
    font-size: 0.9rem;
  `,
};
export default STYLE;
