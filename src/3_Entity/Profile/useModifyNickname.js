import { useState } from "react";

const modifyNickname = async (token, nickname) => {
  try {
    const response = await fetch(`/account/nickname`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ nickname }),
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          console.log("입력 값 오류: 닉네임 형식이 잘못되었습니다.");
          break;
        case 401:
          console.log("인증 실패: 토큰이 유효하지 않습니다.");
          break;
        case 409:
          console.log("중복 닉네임: 해당 닉네임은 이미 사용 중입니다.");
          break;
        default:
          console.log("서버 오류 발생");
      }
      return null; // 에러 발생 시 null 반환
    }

    // 성공적으로 변경된 결과 반환
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

const useModifyNickname = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modify = async (token, nickname) => {
    try {
      setLoading(true);
      setError(null);
      const result = await modifyNickname(token, nickname);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message || "닉네임 수정 중 오류 발생");
      return null;
    }
  };

  return { modify, loading, error };
};

export default useModifyNickname;
