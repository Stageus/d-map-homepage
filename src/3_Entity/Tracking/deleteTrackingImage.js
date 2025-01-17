import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

// 삭제 API 호출 함수
const deleteTrackingImage = async (idxList) => {
  try {
    const endpoint = `${BASE_URL}/tracking`;
    const response = await fetchRequest(
      "DELETE",
      endpoint,
      idxList,
      TEST_TOKEN
    );

    if (!response.ok) {
      handleDeleteError(response.status);
      throw new Error(`삭제 실패: 상태 코드 ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("삭제 요청 중 오류 발생:", error.message);
    throw error;
  }
};

// 에러 상태 처리 함수
const handleDeleteError = (status) => {
  const errorMessages = {
    400: "잘못된 요청 데이터입니다.",
    401: "인증 오류: 토큰이 유효하지 않습니다.",
    404: "이미지를 찾을 수 없습니다.",
  };

  console.error(
    errorMessages[status] || `예상치 못한 오류: 상태 코드 ${status}`
  );
};

export default deleteTrackingImage;
