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
    position: fixed;
    width: 100%;
    height: 5vh;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
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
  `,

  ResultList: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  `,
  ResultItem: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 8px;
  `,
  SliderWrapper: styled.div`
    margin-top: 5vh;
    overflow-x: hidden; /* 슬라이더 영역 외부 콘텐츠 숨기기 */
    width: 100%;
    flex-grow: 1;
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 0.5px solid ${({ theme }) => theme.black};
    margin-right: 5px;
    margin-left: 5px;
    object-fit: cover;
  `,
  NicckNameContainer: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
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
    height: 400px;
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
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `,
  ModalContent: styled.div`
    background: white;
    width: 90%;
    height: 95%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  `,
  TrackingModalList: styled.div`
    overflow-y: auto;
    height: 95%;
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #333;
  `,
  OpenButton: styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  `,
};

export default STYLE;
