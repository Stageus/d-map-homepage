import styled from "styled-components";

const STYLE = {
  SnsPageContainer: styled.div`
    padding-top: 50px;
    height: 100%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  `,
  TrackingImageWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
  background-color: white;
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    min-height: 50px;
    align-items: end;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `,
  Date: styled.h3`
    font-size: x-large;
    font-weight: bold;
  `,
  SortingSelect: styled.select`
    border: none;
    color: gray;
    outline: none;
  `,

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
