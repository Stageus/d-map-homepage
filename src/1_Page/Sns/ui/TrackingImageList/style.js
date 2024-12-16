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
  `,
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
