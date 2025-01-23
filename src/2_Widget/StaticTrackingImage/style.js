import styled from "styled-components";

const STYLE = {
  StaticMapWrapper: styled.div`
    width: 100%;
    height: ${(props) => props.$height};
  `,
  StaticMapImage: styled.img`
    width: 100%;
    height: 100%;
  `,
};

export default STYLE;
