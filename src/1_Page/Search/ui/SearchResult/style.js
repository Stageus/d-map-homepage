import styled, { keyframes } from "styled-components";

// 로딩 애니메이션 정의
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const STYLE = {
  TabContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
    margin-top: 10vh;
  `,
  TabBox: styled.div`
    position: relative;
    width: 80%;
    display: flex;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.blue};
    height: 40px;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `,
  TabBackground: styled.div`
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: ${({ $activeTabName }) => ($activeTabName ? "5px" : "50%")};
    color: ${({ theme }) => theme.blue};
    width: calc(50% - 10px);
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: calc(5vh - 10px); /* 높이 맞춤 */
  `,

  Tab: styled.button`
    flex: 1;
    padding: 10px 0;
    transition: all 0.3s ease-in-out;
    color: ${({ $active, theme }) => ($active ? theme.blue : theme.white)};
    border: none;
    font-size: 16px;
    font-weight: bold;
  `,

  ResulTab: styled.div`
    width: 100%;
    height: calc(90vh - 100px);
    flex-direction: column;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(1);
    overflow-y: auto;
  `,
  SearchPointTab: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: calc(90vh - 100px);
  `,

  ResultItem: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 8px;
  `,
  SliderWrapper: styled.div`
    overflow-x: hidden; /* 슬라이더 영역 외부 콘텐츠 숨기기 */
    width: 100%;
    flex-grow: 1;
  `,
  Slider: styled.div`
    display: flex;
    width: 200%; /* 두 개의 탭을 모두 포함할 넓이 */
    margin-left: ${({ $tabIndex }) => -$tabIndex * 100}%;
    /* fixed 필요 요소에서는 transfrom 사용 불가  */
    /* transform: translateX(${({ $tabIndex }) => -$tabIndex * 50}%); */
    /* will-change: transform; */
    /* transition: transform 0.5s ease-in-out; */
  `,
  TitleContainer: styled.div`
    display: flex;
    height: auto;
    width: 100%;
    align-items: center;
  `,
  Title: styled.p`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  `,
  ProfileIcon: styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  `,
  NicckNameContainer: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    border: 1px solid ${({ theme }) => theme.blue};
    margin: 10px;
    border-radius: 8px;
  `,
  NickNameIcon: styled.img`
    width: 30px;
    height: 30px;
  `,
  NickNameText: styled.div`
    font-weight: bold;
    margin: 5px;
  `,
  EmptyMessage: styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    color: ${({ theme }) => theme.gray};
    margin: 10px;
  `,
  MapPreview: styled.div`
    padding: 10px;
    padding-top: 0px;
    border: 1px solid ${({ theme }) => theme.blue};
    border-radius: 8px;
    margin: 10px;
  `,
  TrackingImageWrapper: styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
  `,
  LoaderContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    bottom: 60px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 100vh;
  `,
  Loader: styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto;
  `,
};

export default STYLE;
