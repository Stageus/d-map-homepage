import { useState, useEffect } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
import { use } from "react";

const ITEMS_PER_PAGE = 20;
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetTrackingImageList = (userIdx, page, categoryState) => {
  const [loading, setLoading] = useState(true);
  const [trackingImageList, setTrackingImageLists] = useState([]);
  const [hasMoreContent, setHasMoreContent] = useState({
    save: false,
    share: false,
  });

  const updateListAndState = (data, isSaveCategory) => {
    const key = isSaveCategory ? "save" : "share";
    setTrackingImageLists((prev) => [...prev, ...data]);
    setHasMoreContent((prev) => ({
      ...prev,
      [key]: data.length >= ITEMS_PER_PAGE,
    }));
  };
  const fetchTrackingImageList = async (category) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/tracking/account/${userIdx}?page=${page}&category=${category}`;
      console.log(url);
      const response = await fetchRequest("GET", url, null, TEST_TOKEN);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message}`);
      }

      const data = await response.json();
      updateListAndState(data.tracking_image, category === 0);
    } catch (error) {
      console.error("Failed to fetch tracking image list:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrackingImageList(0);
  }, []);
  useEffect(() => {
    fetchTrackingImageList(categoryState);
  }, [userIdx, page]);

  return {
    trackingImageList,
    loading,
    hasMoreContent,
  };
};

export default useGetTrackingImageList;
