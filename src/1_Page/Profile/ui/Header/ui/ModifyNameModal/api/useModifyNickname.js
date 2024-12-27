import { useState } from "react";

// 닉네임 수정 API 호출 함수
const modifyNickname = async (userIdx, newNickname) => {
  try {
    const response = await fetch(`https://주소/user/nicknameModify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userIdx,
        nickname: newNickname,
      }),
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          console.log("입력 값 오류");
          break;
        case 409:
          console.log("중복 닉네임 존재");
          break;
        default:
          console.log("서버 오류 발생");
      }
      return null;
    }

    // 성공적으로 수정된 닉네임 반환
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error; // 에러 재발생
  }
};

// 닉네임 수정 Hook
const useModifyNickname = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateNickname = async (userIdx, newNickname) => {
    try {
      setLoading(true);
      await modifyNickname(userIdx, newNickname);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return { loading, error, updateNickname };
};

export default useModifyNickname;
