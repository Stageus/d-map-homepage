import { useState, useEffect, useRef } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;
const ITEMS_PER_PAGE = 20;

const useGetTrackingImageList = (userIdx, page, sharingType) => {
  const [loading, setLoading] = useState(false);
  const [trackingImageData, setTrackingImageData] = useState({
    share: [],
    save: [],
  });
  const [hasMoreContent, setHasMoreContent] = useState({
    share: false,
    save: false,
  });

  const prevUserIdxRef = useRef(null);

  // 공유 유형에 따른 key 매핑 함수
  const getSharingKey = (sharing) => (sharing === 1 ? "share" : "save");

  // 데이터 및 페이지네이션 처리 함수
  const updateDataAndHasMoreContent = (data, sharingType) => {
    const key = getSharingKey(sharingType);
    if (data?.tracking_image) {
      setTrackingImageData((prev) => ({
        ...prev,
        [key]:
          page === 1
            ? data.tracking_image
            : [...prev[key], ...data.tracking_image],
      }));

      setHasMoreContent((prev) => ({
        ...prev,
        [key]: data.tracking_image.length >= ITEMS_PER_PAGE,
      }));
    }
  };

  // API 호출 함수
  const fetchTrackingImageData = async (userIdx, page, sharingType) => {
    if (!userIdx) return;

    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/tracking/account/${userIdx}?page=${page}&category=${sharingType}`;
      const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);
      const data = await response.json();

      if (response.ok) {
        updateDataAndHasMoreContent(data, sharingType);
        prevUserIdxRef.current = userIdx;
      } else {
        console.error(`Error fetching tracking image list: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to fetch tracking image list:", error);
    } finally {
      setLoading(false);
    }
  };

  // 공유된 이미지 불러오기
  useEffect(() => {
    if (!userIdx) return;

    if (prevUserIdxRef.current !== userIdx || page === 1) {
      // 사용자 변경 또는 첫 페이지 로드시 데이터 초기화
      setTrackingImageData({ share: [], save: [] });
      setHasMoreContent({ share: false, save: false });
    }

    fetchTrackingImageData(userIdx, page, sharingType);
  }, [userIdx, page, sharingType]);

  // 최초 마운트 시 저장된 이미지 데이터 가져오기
  useEffect(() => {
    if (userIdx) {
      fetchTrackingImageData(userIdx, 1, 0); // save (0) 초기 로드
    }
  }, [userIdx]);

  return {
    trackingImageData,
    loading,
    hasMoreContent,
  };
};

export default useGetTrackingImageList;
