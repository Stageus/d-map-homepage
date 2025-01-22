import styled from "styled-components";

const STYLE = {
  Button: styled.button`
    display: flex; /* 내부 콘텐츠 정렬 */
    align-items: center;
    justify-content: center;
    padding: 8px; /* 버튼 크기 조정 */
    background-color: transparent;
    border: none;
    width: 26px;
  `,
  IconImg: styled.img`
    width: 24px;
    object-fit: contain; /* 이미지 비율 유지 */
  `,
};

export default STYLE;
