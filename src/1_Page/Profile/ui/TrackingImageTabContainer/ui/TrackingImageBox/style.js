import styled from "styled-components";

const STYLE = {
  TrackingContainer: styled.div`
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    width: 100%;
  `,

  TrackingClickBox: styled.div`
    appearance: none;
    width: 20px;
    height: 20px;
    position: absolute;
    font-size: 20px;
    top: 8px; /* 상단 여백 */
    right: 8px; /* 우측 여백 */
    transition: all 0.2s ease;
    font-weight: 900;
    background-color: ${({ theme }) => theme.white};
    opacity: 60%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 약간의 그림자 추가 */
  `,
  TrackingCheckbox: styled.input.attrs({ type: "checkbox" })`
    z-index: 10000;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.lignt_gray};
    border-radius: 4px;
    position: absolute;
    top: 8px; /* 상단 여백 */
    right: 8px; /* 우측 여백 */
    transition: all 0.2s ease;

    &:checked {
      background-color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.blue};
    }
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
  `,
  ModalContent: styled.div`
    background: white;
    position: relative;
    width: 90%;
    height: 95vh;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  `,
  CloseButton: styled.button`
    position: absolute;
    right: 0;
    font-size: 1.5rem;
  `,
};

export default STYLE;
