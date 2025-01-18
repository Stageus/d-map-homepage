import styled from "styled-components";

const STYLE = {
  // 테마 기반 버튼 스타일
  BottomSheetButton: styled.button`
    width: 100%;
    padding: 20px 0;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border: none;
    background-color: ${({ theme, bgColor }) => bgColor || theme.white};
    color: ${({ theme, color }) => color || theme.black};
    cursor: pointer;
    &:active {
      opacity: 0.7;
    }
  `,
};

export default STYLE;
