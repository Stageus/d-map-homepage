import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const getTrackData = async (userIdx, page) => {
  if (!userIdx || !page) {
    throw new Error("유효하지 않은 사용자 ID 또는 페이지 번호입니다.");
  }

  try {
    // 실제 API 호출
    const endpoint = `${BASE_URL}/tracking/account/${userIdx}?page=${page}`;
    const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);

    if (!response.ok) {
      const errorMessages = {
        400: "입력 값 오류",
        409: "중복 데이터 존재",
        500: "서버 내부 오류가 발생했습니다.",
      };

      const message =
        errorMessages[response.status] ||
        "알 수 없는 서버 오류가 발생했습니다.";
      console.error(`Error ${response.status}: ${message}`);
      throw new Error(message);
    }

    const trackData = await response.json();
    return trackData.tracking_image;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 호출자에게 에러 전달
  }
};

export default getTrackData;
