import { useEffect, useState } from "react";

const getUserData = async (userIdx) => {
  try {
    const response = await fetch(`https://주소/user/${userIdx}`, {
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
          console.log("입력 값 오류");
          break;
        case 409:
          console.log("중복 데이터 존재");
          break;
        default:
          console.log("서버 오류 발생");
      }
      return null; // 에러 발생 시 null 반환
    }

    // 응답 처리
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 에러 재발생
  }
};

const useUserData = (initialUserIdx = null) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (userIdx) => {
    try {
      setLoading(true);
      const user = await getUserData(userIdx);
      setUserData(user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (initialUserIdx) {
      fetchData(initialUserIdx);
    }
  }, [initialUserIdx]);

  return { userData, loading, error };
};

export default useUserData;
