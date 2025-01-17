import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const putNickname = async (token, nickname) => {
  try {
    const endpoint = `${BASE_URL}/account/nickname`;

    const response = await fetchRequest("PUT", endpoint, nickname, token);

    if (!response.ok) {
      const errorMessages = {
        400: "입력 값 오류: 닉네임 형식이 잘못되었습니다.",
        401: "인증 실패: 토큰이 유효하지 않습니다.",
        409: "중복 닉네임: 해당 닉네임은 이미 사용 중입니다.",
      };

      const message =
        errorMessages[response.status] || "서버 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);
      throw new Error(message);
    }

    const result = await response.json();
    return result; // 성공적으로 처리된 응답 반환
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 호출자에게 에러 전달
  }
};

export default putNickname;
