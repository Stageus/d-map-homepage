import { useState, useEffect } from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 20;

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetTrackingImageList = (userIdx, page) => {
  const [loading, setLoading] = useState(true);
  const [trackingImageList, setTrackingImageList] = useState([]);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    const fetchTrackingImageList = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await fetchRequest(
          "GET",
          `${BASE_URL}/tracking/account/${userIdx}?page=${page}`,
          null,
          TEST_TOKEN
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error: ${errorData.message}`);
          return;
        }

        const data = await response.json();
        setTrackingImageList((prev) => [...prev, ...data.tracking_image]); // 데이터 누적
        setHasMoreContent(data.tracking_image.length >= ITEMS_PER_PAGE); // 더 많은 데이터 여부
      } catch (error) {
        console.error("Error fetching tracking image list:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchTrackingImageList();
  }, [userIdx, page]);

  return { trackingImageList, loading, hasMoreContent };
};

export default useGetTrackingImageList;
