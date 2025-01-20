import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

// 사용자 데이터 가져오기 함수
const getUserInfo = async (userIdx) => {
  try {
    if (!userIdx) {
      throw new Error("유효하지 않은 사용자 ID입니다.");
    }
    const endpoint = `${BASE_URL}/account/info/${userIdx}`;

    const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);

    if (!response.ok) {
      const errorMessages = {
        500: "예상치 못한 에러입니다.",
      };

      const message =
        errorMessages[response.status] || "서버 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);
      throw new Error(message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 호출자에게 에러 전달
  }
};

export default getUserInfo;
