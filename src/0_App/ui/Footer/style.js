import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    position: fixed;
    bottom: 0;
    height: 32px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    gap: 24px;
    max-width: 768px;
    background-color: white;
  `,
  Tab: styled.button`
    width: 32px;
  `,
};

export default STYLE;
