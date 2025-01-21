import { useState, useEffect } from "react";
import getTrackingImageList from "../../../3_Entity/Tracking/getTrackingImageList";

const ITEMS_PER_PAGE = 20;

const useGetTrackingImageList = (userIdx, page, sharing) => {
  const [trackingImageList, setTrackingImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState({
    save: false,
    share: false,
  });

  // 데이터 업데이트 및 페이지네이션 처리
  const updateDataAndHasMoreContent = (data, sharing) => {
    const key = sharing === 1 ? "share" : "save";
    setTrackingImageList((prev) => [...prev, ...(data.tracking_image || [])]);
    setHasMoreContent((prev) => ({
      ...prev,
      [key]: data.tracking_image?.length >= ITEMS_PER_PAGE,
    }));
  };

  useEffect(() => {
    if (!userIdx) return;

    const fetchData = async () => {
      setLoading(true);
      const data = await getTrackingImageList(userIdx, page, sharing);
      if (data) {
        updateDataAndHasMoreContent(data, sharing);
      }
      setLoading(false);
    };

    fetchData();
  }, [userIdx, page, sharing]);

  // 저장된 데이터, 공유된 데이터 불러오기 (초기 로드 시)
  useEffect(() => {
    if (!userIdx) return;

    const fetchSavedData = async () => {
      setLoading(true);
      const data = await getTrackingImageList(userIdx, page, 0);
      if (data) {
        updateDataAndHasMoreContent(data, 0);
      }
      setLoading(false);
    };

    fetchSavedData();
  }, [userIdx]);

  return {
    trackingImageList,
    loading,
    hasMoreContent,
  };
};

export default useGetTrackingImageList;
