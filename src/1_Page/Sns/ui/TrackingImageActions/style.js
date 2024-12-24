import styled from "styled-components";

const STYLE = {
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
  Icon: styled.img`
    width: 24px;
    cursor: pointer;
  `,
  DetailModal: styled.div`
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
    border: 5px orange solid;
  `,
};

export default STYLE;
