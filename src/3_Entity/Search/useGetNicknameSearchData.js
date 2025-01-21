import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

const useGetNicknameSearchData = (text, page) => {
  const [loading, setLoading] = React.useState(true);
  const [nicknameData, setNicknameData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);

  const fetchNicknameData = async () => {
    try {
      const endpoint = `${BASE_URL}/search/${SEARCH_TYPE.NICKNAME}?=${text}&=${page}`;
      const response = await fetchRequest("GET", endpoint, null, null);
      const data = await response.json();

      if (response.status === 200) {
        setNicknameData((prev) => [...prev, ...data.rows]);
        setHasMoreContent(data.rows.length >= ITEMS_PER_PAGE);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching nickname data", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNicknameData();
  }, [text, page]);

  return [nicknameData, loading, hasMoreContent];
};

export default useGetNicknameSearchData;
