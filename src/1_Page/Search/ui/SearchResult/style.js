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
  Container: styled.div`
    padding: 16px;
  `,
  TabContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
  `,
  TabBox: styled.div`
    position: relative;
    width: 80%;
    display: flex;
    border-radius: 25px;
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
    width: calc(50% - 10px);
    background-color: ${({ theme }) => theme.white};
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
  `,
  Tab: styled.button`
    flex: 1;
    z-index: 1;
    padding: 10px 0;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    color: ${({ $active, theme }) => ($active ? theme.blue : theme.white)};
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  `,
  ResultList: styled.div`
    display: flex;
    width: 100%;
    height: 500px;
    flex-direction: column;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; // 모바일 터치 스크롤 활성화
  `,
  ResultItem: styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 8px;
  `,
  SliderWrapper: styled.div`
    overflow: hidden; /* 슬라이더 영역 외부 콘텐츠 숨기기 */
    width: 100%;
  `,
  Slider: styled.div`
    display: flex;
    width: 200%; /* 두 개의 탭을 모두 포함할 넓이 */
    transform: translateX(${({ $tabIndex }) => -$tabIndex * 50}%);
    transition: transform 0.5s ease-in-out;
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
    line-height: 100%;
  `,
  ProfileIcon: styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.black};
    margin-right: 5px;
    margin-left: 5px;
  `,
  NicckNameContainer: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.blue};
    padding: 10px;
    margin: 10px;
  `,
  NickNameIcon: styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;
  `,
  NickNameText: styled.div`
    font-weight: bold;
    margin: 5px;
  `,
  EmptyMessage: styled.div`
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
    height: 800px;
  `,
  LoaderContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* 부모 컨테이너의 전체 높이 */
  `,
  Loader: styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1); /* 바깥쪽 테두리 */
    border-top: 4px solid #3498db; /* 위쪽 테두리 (색상) */
    border-radius: 50%; /* 원형 */
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite; /* 애니메이션 */
    margin: 20px auto; /* 중앙 정렬 */
  `,
};

export default STYLE;
