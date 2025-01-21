import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

// 사용자 데이터 가져오기 함수
const getMyInfo = async () => {
  try {
    const endpoint = `${BASE_URL}/account/me`;
    console.log(endpoint);
    const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 호출자에게 에러 전달
  }
};

export default getMyInfo;
