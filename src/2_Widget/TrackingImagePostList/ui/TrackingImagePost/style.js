import styled from "styled-components";

const STYLE = {
  TrackingImageWrapper: styled.div``,
  Container: styled.div`
    scroll-snap-align: end;
    scroll-snap-stop: normal;
    display: flex;
    flex-direction: column;
    height: fit-content;
  `,
  InfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    font-size: medium;
  `,
  BtnContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
  `,
  DetailModal: styled.div`
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  `,
  Button: styled.button`
    line-height: 26px;
    background-color: transparent;
    border: none;
    width: 26px;
    height: 26px;
    position: absolute;
    top: 16px;
    left: 16px;
    border-radius: 50%;
    background-color: gray;
  `,
  PostInfo: styled.h3`
    padding: 8px;
    display: flex;
    gap: 8px;
    align-items: end;
    justify-content: space-between;
  `,
  PosterInfoContainer: styled.div`
    display: flex;
    align-items: end;
    gap: 8px;
  `,
  PosterName: styled.p`
    font-size: small;
  `,
  PostUpdated: styled.p`
    font-size: x-small;
    font-weight: 400;
    color: gray;
  `,
  ProfileImage: styled.img`
    border-radius: 50%;
    width: 48px;
    height: 48px;
  `,
  SearchPoint: styled.p`
    font-size: small;
    white-space: nowrap; /* 줄 바꿈 방지 */
    overflow: hidden; /* 넘치는 부분 숨김 */
    text-overflow: ellipsis; /* 넘친 텍스트를 ...으로 표시 */
    width: 200px;
    text-align: end;
  `,
  DetailModalSearchPoint: styled.p`
    font-size: small;
    position: absolute;
    top: 4px;
    right: 16px;
  `,
  StaticMapWrapper: styled.div`
    width: 100%;
  `,
  StaticMapImage: styled.img`
    width: 100%;
    height: 100%;
  `,
};

export default STYLE;
