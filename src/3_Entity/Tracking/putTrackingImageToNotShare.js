import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

// 공유 상태 수정 API 호출 함수
const putTrackingImageToNotShare = async (idxList) => {
  try {
    const endPoint = `${BASE_URL}/tracking/toNotSharing`;
    console.log(idxList);
    const response = await fetchRequest(
      "PUT",
      endPoint,
      { idxList },
      TEST_TOKEN
    );

    if (!response.ok) {
      handleModifyError(response.status);
      throw new Error(`수정 실패: 상태 코드 ${response.status}`);
    }

    const result = await response.json();
    console.log("공유 상태가 성공적으로 수정되었습니다.");
    return result;
  } catch (error) {
    console.error("공유 상태 수정 중 오류 발생:", error.message);
    throw error;
  }
};

// 에러 상태 처리 함수
const handleModifyError = (status) => {
  const errorMessages = {
    400: "입력 값 오류",
    401: "인증 실패",
    404: "리소스를 찾을 수 없습니다",
    409: "충돌 발생",
  };

  console.error(errorMessages[status] || `서버 오류 발생: 상태 코드 ${status}`);
};

export default putTrackingImageToNotShare;
