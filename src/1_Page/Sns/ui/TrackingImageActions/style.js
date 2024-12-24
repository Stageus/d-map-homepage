import styled from "styled-components";

const STYLE = {
  InfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    font-size: medium;
  `,
  IconContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
  `,
  Icon: styled.img`
    width: 24px;
    cursor: pointer;
  `
};

export default STYLE;
