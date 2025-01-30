import styled from "styled-components";

const STYLE = {
  BodyContainer: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
  `,
};

export default STYLE;
