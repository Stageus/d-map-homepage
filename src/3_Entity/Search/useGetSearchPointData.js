import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { useFetch } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 20;

const useGetSearchPointData = (text, page) => {
  const [serverState, request, loading] = useFetch();
  const [searchPointData, setSearchPointData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  const prevTextRef = React.useRef(text);

  React.useEffect(() => {
    const endpoint = `/search/${SEARCH_TYPE.SEARCHPOINT}?text=${text}&page=${page}`;
    request("GET", endpoint, null);
  }, [text, page]);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 400:
        console.log("text 오류");
        break;
      default:
        console.warn("response:", serverState);
        break;
    }
    if (prevTextRef.current !== text) {
      // 검색어가 변경되면 데이터 초기화
      setSearchPointData(serverState.rows);
    } else {
      // 페이지가 변경될 때 기존 데이터에 추가
      setSearchPointData((prev) => [...prev, ...serverState.rows]);
    }
    setHasMoreContent(serverState.rows.length >= ITEMS_PER_PAGE);
    prevTextRef.current = text; // 현재 검색어 저장
  }, [serverState]);
  return [searchPointData, loading, hasMoreContent];
};

export default useGetSearchPointData;
