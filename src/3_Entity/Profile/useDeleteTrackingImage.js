import { useState } from "react";

const deleteTrackingImageAPI = async (idx, token) => {
  const response = await fetch(`/tracking/${idx}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        console.log("잘못된 요청 데이터입니다.");
        break;
      case 401:
        console.log("인증 오류: 토큰이 유효하지 않습니다.");
        break;
      case 404:
        console.log("이미지를 찾을 수 없습니다.");
        break;
      default:
        console.log(`예상치 못한 오류: ${response.status}`);
    }
    throw new Error("삭제 실패");
  }
  return response;
};

const useDeleteTrackingImage = (token) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const deleteTrackingImage = async (idx) => {
    try {
      setLoading(true);
      setStatus("loading");
      await deleteTrackingImageAPI(idx, token);
      setStatus("success");
      console.log("이미지가 성공적으로 삭제되었습니다.");
    } catch (err) {
      console.log("네트워크 또는 서버 오류:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return { deleteTrackingImage, loading, status };
};

export default useDeleteTrackingImage;
