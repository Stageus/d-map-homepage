import styled from "styled-components";

const STYLE = {
  ProfileWrapper: styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden; /* 이미지가 둥근 테두리에 맞게 잘리도록 설정 */
    background-color: #ddd; /* 배경색, 이미지가 없을 때 표시 */
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춤 */
  `,
};

export default STYLE;
