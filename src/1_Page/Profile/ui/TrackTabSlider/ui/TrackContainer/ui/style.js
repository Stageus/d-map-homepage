import styled from "styled-components";

const STYLE = {
  MapContainer: styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    /* 지도 데이터, 약관 제거 */
    .gm-style > div:nth-child(2) {
      display: none !important;
    }

    /* 단축키 숨기기 */
    .gmnoprint {
      display: none !important;
    }
  `,
};

export default STYLE;
