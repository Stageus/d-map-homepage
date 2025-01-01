import { useEffect, useState } from "react";
import data from "./dataNickName";

// 랜덤 닉네임 가져오기 API 호출 함수
const fetchRandomNicknames = async () => {
  return data;
  try {
    const response = await fetch(`/account/nickname`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          console.log("요청 오류");
          break;
        case 500:
          console.log("서버 내부 오류");
          break;
        default:
          console.log("서버 오류 발생");
      }
      return null;
    }

    // 성공적으로 닉네임 목록 반환
    const result = await response.json();
    return result.message.nickname; // 닉네임 배열 반환
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

// 랜덤 닉네임 가져오기 Hook
const useGetRandomNicknames = () => {
  const [nicknames, setNicknames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomNicknames = async () => {
    try {
      setLoading(true);
      const fetchedNicknames = await fetchRandomNicknames();
      setNicknames(fetchedNicknames.message.nickname || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  useEffect(() => {
    getRandomNicknames();
  }, []);

  return { nicknames, loading, error, getRandomNicknames };
};

export default useGetRandomNicknames;
