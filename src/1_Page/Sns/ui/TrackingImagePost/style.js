import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  InfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    font-size: medium;
  `,
  BtnContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
  `,
  DetailModal: styled.div`
    display: ${(props) => (props.isOpen ? "block" : "none")};
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 32px;
    left: 0;
    right: 0;
    z-index: 1;
  `,
  Button: styled.button`
    line-height: 26px;
    background-color: transparent;
    border: none;
    width: 26px;
    height: 26px;
    position: absolute;
    top: 16px;
    left: 16px;
    border-radius: 50%;
    background-color: gray;
  `,
};

export default STYLE;
