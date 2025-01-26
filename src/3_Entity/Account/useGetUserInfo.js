import { useState, useEffect, useCallback } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetUserInfo = (userIdx) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    if (!userIdx) {
      setError(new Error("유효하지 않은 사용자 ID입니다."));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = `${BASE_URL}/account/info/${userIdx}`;
      const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUserInfo(result);
    } catch (error) {
      console.error("네트워크 또는 서버 오류:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [userIdx]);

  useEffect(() => {
    if (userIdx) {
      fetchUserInfo();
    }
  }, [userIdx, fetchUserInfo]);

  return [userInfo, fetchUserInfo];
};

export default useGetUserInfo;
