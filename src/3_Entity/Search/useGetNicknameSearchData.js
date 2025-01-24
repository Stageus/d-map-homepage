import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

const useGetNicknameSearchData = (text, page) => {
  const [loading, setLoading] = React.useState(true);
  const [nicknameData, setNicknameData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  const prevTextRef = React.useRef(text);

  const fetchNicknameData = async () => {
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/search/${SEARCH_TYPE.NICKNAME}?text=${text}&page=${page}`;
      const response = await fetchRequest("GET", endpoint, null, null);
      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // 검색어가 변경되었을 경우 데이터 초기화
        if (prevTextRef.current !== text) {
          setNicknameData(data.rows);
        } else {
          setNicknameData((prev) => [...prev, ...data.rows]);
        }

        setHasMoreContent(data.rows.length >= ITEMS_PER_PAGE);
        prevTextRef.current = text;
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
