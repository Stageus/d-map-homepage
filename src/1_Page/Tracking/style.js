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
  Main: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px orange solid;
  `,
  TrackingControlBtnContainer: styled.div`
    display: flex;
    position: absolute;
    bottom: 100px;
    right: calc(50% - 44px);
    justify-content: center;
    width: 88px;
    gap: 16px;
  `,
  TrackingControlBtn: styled.img`
    width: 36px;
    cursor: pointer;
  `,
  TrackingSaveModal: styled.div`
    animation: ${(props) => (props.isModifying ? slideUp : slideDown)} 0.5s ease
      forwards;
    display: ${(props) => (props.isModifying ? "flex" : "none")};
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
  Filter: styled.div`
    display: ${(props) => (props.isModifying ? "block" : "none")};
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: gray;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
};

export default STYLE;
