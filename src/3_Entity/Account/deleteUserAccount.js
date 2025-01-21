const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const deleteAccountUser = async () => {
  try {
    const endpoint = `${BASE_URL}/account/delete`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TEST_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessages = {
        400: "입력 값 오류: 요청이 올바르지 않습니다.",
        401: "인증 실패: 토큰이 유효하지 않습니다.",
        403: "권한 부족: 계정 삭제 권한이 없습니다.",
        500: "서버 오류: 계정 삭제를 처리할 수 없습니다.",
      };

      const message =
        errorMessages[response.status] || "서버 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);
      throw new Error(message);
    }

    return true;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

export default deleteAccountUser;
