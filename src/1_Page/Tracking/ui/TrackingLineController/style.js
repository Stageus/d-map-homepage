import styled from "styled-components";

const STYLE = {
  TrackingLineController: styled.div``,
  TrackingLineControlBtnContainer: styled.div`
    position: absolute;
    top: 0;
    right: 16px;
  `,
  TrackingLineControlBtn: styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TrackingLineControlBtnIconImage: styled.img`
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default STYLE;
