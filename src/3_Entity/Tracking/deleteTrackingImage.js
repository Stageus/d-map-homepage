import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

// 공통 에러 메시지 매핑
const ERROR_MESSAGES = {
  400: "잘못된 요청 데이터입니다.",
  401: "인증 오류: 토큰이 만료되었습니다.",
  403: "잘못된 인증 토큰입니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  500: "서버 연결에 실패하였습니다.",
};

// 에러 상태 처리 함수
const handleErrorResponse = async (response) => {
  const errorMessage =
    ERROR_MESSAGES[response.status] || "알 수 없는 오류 발생";

  if (response.status === 401) {
    console.error("토큰 만료 처리 로직 실행 중...");
  }

  throw new Error(errorMessage);
};

// 이미지 삭제 API 호출 함수
const deleteTrackingImage = async (idxList) => {
  try {
    const response = await fetchRequest(
      "DELETE",
      `${BASE_URL}/tracking`,
      { idxList },
      TEST_TOKEN
    );
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    return true;
  } catch (error) {
    console.error("삭제 요청 중 오류 발생:", error);
    return error.message;
  }
};

export default deleteTrackingImage;
