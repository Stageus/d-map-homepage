import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const mockData = {
  message: {
    user: {
      nickname: "이쁜호랑이",
      image: "/home/account/image.png",
      isMine: true,
    },
  },
};

// 사용자 데이터 가져오기 함수
const getUserInfo = async (userIdx) => {
  if (!userIdx) {
    throw new Error("유효하지 않은 사용자 ID입니다.");
  }
  try {
    // 개발 환경에서 모의 데이터 반환
    if (process.env.NODE_ENV === "development") {
      return mockData.message.user; // 사용자 정보 반환
    }

    const endpoint = `${BASE_URL}/info/${userIdx}`;

    const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);

    if (!response.ok) {
      const errorMessages = {
        400: "입력 값 오류",
        409: "중복 데이터 존재",
      };

      const message =
        errorMessages[response.status] || "서버 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);
      throw new Error(message);
    }

    const result = await response.json();
    return result.message.user; // 사용자 정보 반환
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 호출자에게 에러 전달
  }
};

export default getUserInfo;
