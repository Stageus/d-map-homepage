import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

// 랜덤 닉네임 관리 함수
const getRandomNicknames = async () => {
  try {
    const endpoint = `${BASE_URL}/account/nickname`;

    const response = await fetchRequest("GET", endpoint, null, null);

    // 응답 상태 코드 확인
    if (!response.ok) {
      const errorMessages = {
        400: "잘못된 요청입니다.",
        401: "인증 오류: 토큰이 만료되었습니다.",
        403: "접근 권한이 없습니다.",
        404: "리소스를 찾을 수 없습니다.",
        500: "서버 내부 오류가 발생했습니다.",
      };

      const message =
        errorMessages[response.status] || "알 수 없는 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);

      throw new Error(message);
    }

    const result = await response.json();
    return ["허허잇", "허허잇2", "허허잇3"];
    return result.nickname || [];
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    return { nicknames: [], error: error.message };
  }
};

export default getRandomNicknames;
