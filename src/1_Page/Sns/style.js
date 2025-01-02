import styled from "styled-components";

const STYLE = {
  SnsPageContainer: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  TrackingImageWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    min-height: 50px;
    align-items: end;
  `,
  Date: styled.h3`
    font-size: x-large;
    font-weight: bold;
  `,
  Sorting: styled.select`
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
  `,
  PostInfo: styled.h3`
    padding: 0 8px;
    display: flex;
    gap: 4px;
    align-items: end;
  `,
  PosterName: styled.p``,
  PostUpdated: styled.p`
    font-size: small;
    font-weight: 400;
    color: gray;
  `,
};

export default STYLE;
