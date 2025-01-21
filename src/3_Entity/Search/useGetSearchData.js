import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

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
    try {
      const endpoint = `${BASE_URL}/search/${type}/${text}/${page[type]}`;
      console.log(endpoint);
      const response = await fetchRequest("GET", endpoint, null, null);

      const data = await response.json();
      switch (response.status) {
        case 200:
          result = data.rows;
          break;
        case 400:
        case 500:
          console.log("서버오류");
        default:
          console.log(data.message);
      }
    } catch (error) {
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
    fetchSearchData(type);
    fetchSearchData(type);
  }, [text, page]);

  return [searchData, loading, hasMoreContent];
};

export default useGetSearchData;
