import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

const data = {
  rows: [
    {
      tracking_idx: 96,
      user_idx: 2,
      image:
        "https://drawingmap.s3.ap-northeast-2.amazonaws.com/1737239861308-download-1.jpg",
      searchpoint: "서울시 종로구",
      line: [
        [
          {
            lat: 37.440582788331874,
            lng: 126.66146387071429,
          },
          {
            lat: 37.440582788331874,
            lng: 126.66146387071429,
          },
        ],
        [
          {
            lat: 37.440582788331874,
            lng: 126.66146387071429,
          },
          {
            lat: 37.440582788331874,
            lng: 126.66146387071429,
          },
        ],
      ],
      zoom: 18,
      heading: 0,
      sharing: true,
      likecount: 0,
      color: "#FF0000",
      thickness: 2,
      background: 0,
      createtime: "2025-01-17T03:19:13.420Z",
      updatetime: "2025-01-17T03:19:13.420Z",
      nickname: "허허잇3",
      liked_by_user: false,
      center: {
        lat: 37.440582788331874,
        lot: 126.66146387071429,
      },
    },
  ],
};
const useGetSearchData = (text, page, type) => {
  const [loading, setLoading] = React.useState(true);
  const [searchData, setSearchData] = React.useState({
    [SEARCH_TYPE.NICKNAME]: [],
    [SEARCH_TYPE.SEARCHPOINT]: [],
  });
  const [hasMoreContent, setHasMoreContent] = React.useState(() => ({
    [SEARCH_TYPE.NICKNAME]: false,
    [SEARCH_TYPE.SEARCHPOINT]: false,
  }));
  const fetchSearchData = async (type) => {
    let result = [];

    // 테스트용
    result = data.rows;
    setSearchData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), ...result],
    }));
    setHasMoreContent((prev) => ({
      ...prev,
      [type]: result.length >= ITEMS_PER_PAGE,
    }));
    return;
    try {
      const endpoint = `${BASE_URL}/search/${type}`;
      // const endpoint = `${BASE_URL}/search/${type}&page=${page}`;
      console.log(endpoint);
      const response = await fetchRequest("GET", endpoint, { text }, null);

      const data = await response.json();
      // Handle response status
      switch (response.status) {
        case 200:
          result = data.tracking_image;
          console.log(result, page);
          break;
        case 400:
        case 404:
        case 500:
        default:
          console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setHasMoreContent((prev) => ({
      ...prev,
      [type]: result.length >= ITEMS_PER_PAGE,
    }));

    setSearchData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), ...result],
    }));
  };

  React.useEffect(() => {
    fetchSearchData(SEARCH_TYPE.NICKNAME);
  }, []);

  React.useEffect(() => {
    fetchSearchData(type);
  }, [text, page]);

  return [searchData, loading, hasMoreContent];
};

export default useGetSearchData;
