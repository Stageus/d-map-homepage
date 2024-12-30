import { useState } from "react";

const modifyImage = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`https://your-api-url.com/user/image`, {
      method: "PUT",
      headers: {
        Authorization: token, // Content-Type은 자동 설정됨
      },
      body: formData,
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          console.log("입력 값 오류: 이미지 파일이 올바르지 않습니다.");
          break;
        case 401:
          console.log("인증 실패: 토큰이 유효하지 않습니다.");
          break;
        case 413:
          console.log("파일 크기 초과: 허용된 크기를 초과했습니다.");
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

const useModifyImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modify = async (token, imageFile) => {
    try {
      setLoading(true);
      setError(null);
      const result = await modifyImage(token, imageFile);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  return { modify, loading, error };
};

export default useModifyImage;
