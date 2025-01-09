import { useState } from "react";

const modifySharingTracking = async (token, idxList) => {
  try {
    const response = await fetch(`/tracking`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ idxList }),
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          console.log("입력 값 오류");
          break;
        case 401:
          console.log("인증 실패");
          break;
        case 404:
          console.log("리소스를 찾을 수 없습니다");
          break;
        case 409:
          console.log("충돌 발생");
          break;
        default:
          console.log("서버 오류 발생");
      }
      return null; // 에러 발생 시 null 반환
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

const useModifySharingTracking = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modifySharing = async (idxList) => {
    try {
      setLoading(true);
      setError(null);
      const result = await modifySharingTracking(token, idxList);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message || "수정 중 오류 발생");
      return null;
    }
  };

  return { modifySharing, loading, error };
};

export default useModifySharingTracking;
