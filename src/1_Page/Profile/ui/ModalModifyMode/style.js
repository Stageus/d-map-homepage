import styled from "styled-components";

const STYLE = {
  // 버튼 스타일 추가
  BottomSheetButton: styled.button`
    width: 100%;
    padding: 15px 0;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border: none;
    background-color: ${(props) => props.bgColor || "#f1f1f1"};
    color: ${(props) => props.color || "#000000"};
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }
  `,
};

export default STYLE;
