import data from "./dataNickName";

// 랜덤 닉네임 관리 함수
const getRandomNicknames = async () => {
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const IS_DEV = process.env.NODE_ENV === "development";

  try {
    if (IS_DEV) {
      return { nicknames: data, error: null };
    }
    const endpoint = `${BASE_URL}/account/nickname`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

      if (response.status === 401) {
        console.error("토큰 갱신 로직 실행 중...");
      }

      throw new Error(message);
    }

    const result = await response.json();
    return result.message.nickname || [];
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    return { nicknames: [], error: error.message };
  }
};

export default getRandomNicknames;
