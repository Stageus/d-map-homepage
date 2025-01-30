import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const ITEMS_PER_PAGE = 20;

const useGetSearchPointData = (text, page) => {
  const [loading, setLoading] = React.useState(true);
  const [searchPointData, setSearchPointData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  const prevTextRef = React.useRef(text);

  const fetchSearchPointData = async () => {
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/search/${SEARCH_TYPE.SEARCHPOINT}?text=${text}&page=${page}`;
      const response = await fetchRequest("GET", endpoint, null, null);
      const data = await response.json();

      if (response.status === 200) {
        if (prevTextRef.current !== text) {
          // 검색어가 변경되면 데이터 초기화
          setSearchPointData(data.rows);
        } else {
          // 페이지가 변경될 때 기존 데이터에 추가
          setSearchPointData((prev) => [...prev, ...data.rows]);
        }

        setHasMoreContent(data.rows.length >= ITEMS_PER_PAGE);
        prevTextRef.current = text; // 현재 검색어를 저장
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching search point data", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSearchPointData();
  }, [text, page]);

  return [searchPointData, loading, hasMoreContent];
};

export default useGetSearchPointData;
