import styled from "styled-components";

const STYLE = {
  PostGrid: styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
    grid-auto-rows: calc((100vw - 16px) / 3); /* 가로 너비 기준 */
    width: 50%;
    height: calc(90vh - 150px);
    overflow-y: auto;
  `,
  EmptyMessage: styled.p`
    text-align: center;
    color: ${({ theme }) => theme.gray};
    margin-top: 20px;
    font-size: 0.9rem;
  `,
};

export default STYLE;
