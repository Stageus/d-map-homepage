import { styled, keyframes } from "styled-components";

// 아래에서 위로 올라오는 애니메이션
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 위에서 아래로 내려가는 애니메이션
const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;
const STYLE = {
  TrackingSaveModal: styled.div`
    animation: ${(props) => (props.$isModifying ? slideUp : slideDown)} 0.5s ease
      forwards;
    display: ${(props) => (props.$isModifying ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    padding-top: 36px;
    background-color: white;
    border-radius: 8px 8px 0 0;
  `,
};

export default STYLE;
