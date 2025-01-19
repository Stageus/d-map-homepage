import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

const useGetSearchData = (text, page, type) => {
  const [loading, setLoading] = React.useState(true);
  const [searchData, setSearchData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(() => ({
    [SEARCH_TYPE.nickname]: false,
    [SEARCH_TYPE.searchpoint]: false,
  }));

  React.useEffect(() => {
    const fetchSearchData = async () => {
      let result = [];
      try {
        const response = await fetchRequest(
          "GET",
          `${BASE_URL}/search/${SEARCH_TYPE[type]}&page=${page}`,
          { text },
          null
        );

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
        [SEARCH_TYPE[type]]: result.length >= ITEMS_PER_PAGE,
      }));

      setSearchData((pre) => [...pre, ...result]);
    };

    fetchSearchData();
  }, [text, page]);

  return [searchData, loading, hasMoreContent];
};

export default useGetSearchData;
