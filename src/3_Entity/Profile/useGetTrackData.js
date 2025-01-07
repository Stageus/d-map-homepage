import { useEffect, useState } from "react";
import { sharedPosts } from "./dataSharePost";

// API 호출 함수
const getTrackData = async (userIdx, page) => {
  try {
    // 개발 중에는 로컬 데이터를 반환
    return sharedPosts.message;

    // 실제 API 호출
    const response = await fetch(`/tracking${userIdx}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 상태 코드 처리
      switch (response.status) {
        case 400:
          console.error("입력 값 오류");
          break;
        case 409:
          console.error("중복 데이터 존재");
          break;
        default:
          console.error("서버 오류 발생");
      }
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("네트워크 또는 서버 오류:", error);
    throw error;
  }
};

// 커스텀 훅
const useGetTrackData = (userIdx, page) => {
  const [track, setTrack] = useState([]);
  const [trackLoading, setLoading] = useState(false);
  const [trackError, setError] = useState(null);

  const fetchTrackData = async () => {
    setLoading(true);
    setError(null);
    try {
      const trackData = await getTrackData(userIdx, page);
      console.log(trackData);
      setTrack((prev) => [...prev, ...trackData]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userIdx && page) {
      fetchTrackData();
    }
  }, [userIdx, page]);

  return {
    track,
    trackLoading,
    trackError,
    fetchTrackData,
  };
};

export default useGetTrackData;
