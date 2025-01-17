import { sharedPosts } from "../Profile/dataSharePost";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// 에러 상태 처리 함수
const handleError = (status) => {
  const errorMessages = {
    400: "입력 값 오류",
    409: "중복 데이터 존재",
    default: "서버 오류 발생",
  };
  console.error(errorMessages[status] || errorMessages.default);
};

// API 호출 함수
const getTrackData = async (userIdx, page) => {
  try {
    // 개발 환경에서 로컬 데이터를 반환
    if (process.env.NODE_ENV === "development") {
      return sharedPosts.message;
    }
    // 실제 API 호출
    const endpoint = `${BASE_URL}/tracking/account/${userIdx}?page=${page}`;
    const response = await fetchRequest("GET", endpoint);

    if (!response.ok) {
      handleError(response.status);
      return null;
    }

    const data = await response.json();
    return data?.message || [];
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

export default getTrackData;
