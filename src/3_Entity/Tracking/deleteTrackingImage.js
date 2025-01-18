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
      { idxList },
      TEST_TOKEN
    );

    if (!response.ok) {
      await handleErrorResponse(response);
    }
    return await response.json(); // 응답 데이터 반환
  } catch (error) {
    console.log(error);
  }
};

// 에러 상태 처리 함수
const handleErrorResponse = async (response) => {
  const errorMessages = {
    400: "잘못된 요청 데이터입니다.",
    401: "인증 오류: 토큰이 만료되었습니다.",
    403: "잘못된 인증 토큰입니다.",
    404: "요청한 리소스를 찾을 수 없습니다.",
    500: "서버 연결에 실패하였습니다.",
  };
  switch (response.status) {
    case 401:
      console.error("토큰 만료 처리 로직 실행 중...");
      break;
    case 403:
      console.error(errorMessages[403]);
      break;
    case 404:
      console.error(errorMessages[404]);
      break;
    case 500:
      console.error(errorMessages[500]);
      break;
    default:
      console.error("오류");
  }
};

export default deleteTrackingImage;
