import styled from "styled-components";

const STYLE = {
  Button: styled.button`
    display: flex; /* 내부 콘텐츠 정렬 */
    align-items: center;
    justify-content: center;
    padding: 8px; /* 버튼 크기 조정 */
    background-color: transparent;
    border: none;
    width: 26px;
  `,
  IconImg: styled.img`
    width: 24px;
    object-fit: contain; /* 이미지 비율 유지 */
  `,
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* 반투명 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `,
  ModalContent: styled.div`
    background: ${({ theme }) => theme.white};
    padding: 20px;
    width: 320px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  `,
  ModalMessage: styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.black};
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  `,
  ModalButton: styled.button`
    width: 120px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
  `,
};

export default STYLE;
