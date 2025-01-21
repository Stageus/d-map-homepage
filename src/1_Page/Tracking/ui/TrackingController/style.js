import { styled } from "styled-components";

const STYLE = {
  TrackingControlBtnContainer: styled.div`
    display: flex;
    position: absolute;
    bottom: 100px;
    right: calc(50% - 44px);
    justify-content: center;
    width: 88px;
    gap: 16px;
  `,
  TrackingControlBtn: styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TrackingControlBtnIconImage: styled.img`
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

};

export default STYLE;
