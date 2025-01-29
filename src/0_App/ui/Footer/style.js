import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: fixed;
    bottom: 0;
    height: 32px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    max-width: 528px;
    background-color: white;
  `,
  Tab: styled.button`
    width: 100%;
    background-color: ${(props) => (props.$isCurrentPage ? props.theme.blue : "white")};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
  `,
};

export default STYLE;
