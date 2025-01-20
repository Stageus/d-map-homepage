import { styled } from "styled-components";

const STYLE = {
  TrackingPageContainer: styled.div`
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
  TrackingToolContainer: styled.div`
    display: flex;
    position: absolute;
    top: 16px;
    left: 8px;
    justify-content: center;
    align-items: center;
    gap: 16px;
  `,
  TrackingToolBtn: styled.button`
    width: 30px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TrackingToolBtnIConImage: styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TrackingToolDiv: styled.div`
    width: 60px;
    height: 24px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 1px 1px 2px black;
    font-size: small;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};

export default STYLE;
