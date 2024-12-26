import styled from "styled-components";

const STYLE = {
  InputContainer: styled.div`
    display: flex;
    align-items: center; /* 아이템 수직 중앙 정렬 */
    border-bottom: 1px solid #ccc; /* 하단에 라인 추가 */
    padding: 8px 0; /* 위아래 여백 추가 */
    width: 100%;
  `,
  Input: styled.input`
    flex: 1; /* 입력 필드가 남은 공간을 차지 */
    border: none; /* 테두리 제거 */
    outline: none; /* 선택 시 외곽선 제거 */
    font-size: 16px;
    padding: 0 8px; /* 입력 필드 좌우 여백 */
  `,
  Icon: styled.span`
    font-size: 18px;
    color: #666;
    cursor: pointer;
    margin-left: 8px; /* 아이콘과 입력 필드 간 간격 */
  `,
  ErrorMessage: styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    min-height: 18px;
    padding: 3px;
    height: 15px;
  `,
};

export default STYLE;
