import styled from "styled-components";

const STYLE = {
  TrackingList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    font-size: large;
    font-weight: bold;
  `,
  TrackingContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    scroll-snap-align: end;
  `,
};

export default STYLE;
