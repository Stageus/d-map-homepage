import { useState, useEffect } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 20;
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetTrackingImageList = (userIdx, page, sharing) => {
  const [loading, setLoading] = useState(true);
  const [trackingImageList, setTrackingImageLists] = useState([]);

  useEffect(() => {
    console.log(trackingImageList);
  }, [trackingImageList]);

  const [hasMoreContent, setHasMoreContent] = useState({
    save: false,
    share: false,
  });

  const updateDataAndHasMoreContent = (data, sharing) => {
    const key = sharing === 1 ? "share" : "save";
    setTrackingImageLists((prev) => [...prev, ...data]);
    setHasMoreContent((prev) => ({
      ...prev,
      [key]: data.length >= ITEMS_PER_PAGE,
    }));
  };
  const fetchTrackingImageList = async (sharing) => {
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/tracking/account/${userIdx}?page=${page}&category=${sharing}`;
      console.log(endpoint);
      const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message}`);
      }
      const data = await response.json();
      console.log(data);
      updateDataAndHasMoreContent(data.tracking_image, sharing);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingImageList(sharing);
  }, [userIdx, page]);

  // 저장된 데이터 , 공유된 데이터 불러오기
  useEffect(() => {
    fetchTrackingImageList(0);
  }, []);

  return {
    trackingImageList,
    loading,
    hasMoreContent,
  };
};

export default useGetTrackingImageList;
