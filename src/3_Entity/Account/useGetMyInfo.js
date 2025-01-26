import { useState, useEffect, useCallback } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetMyInfo = () => {
  const [myInfo, setMyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 사용자 데이터 가져오기 함수
  const fetchMyInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = `${BASE_URL}/account/me`;
      const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(`서버 오류: ${result.message}`);
      }

      setMyInfo(result);
    } catch (error) {
      console.error("네트워크 또는 서버 오류:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  return [myInfo, fetchMyInfo];
};

export default useGetMyInfo;
