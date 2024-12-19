import { useEffect, useState } from "react";

import { sharedPosts } from "./data";

const getTrackData = async (userIdx) => {
  return sharedPosts;
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
const parseShare = (data) => {
  const share = data?.message.filter((item) => item.sharing === 0);
  const save = data?.message.filter((item) => item.sharing === 1);
  return { share, save };
};

const useTrackData = () => {
  const [trackShareData, setTrackShareData] = useState(null);
  const [trackSaveData, setTrackSaveData] = useState(null);
  const [trackLoading, setLoading] = useState(null);
  const [trackError, setError] = useState(null);

  const fetchData = async (userIdx) => {
    try {
      setLoading(true);
      const trackData = await getTrackData(userIdx);
      const { share, save } = parseShare(trackData);
      console.log(share, save);
      setTrackShareData(share);
      setTrackSaveData(save);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return { trackShareData, trackSaveData, trackLoading, trackError, fetchData };
};

export default useTrackData;
