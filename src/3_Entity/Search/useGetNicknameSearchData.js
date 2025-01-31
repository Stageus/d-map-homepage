import React from "react";
import SEARCH_TYPE from "../../1_Page/Search/constant/SEARCH_TYPE";
import { useFetch } from "../../4_Shared/util/apiUtil";
const ITEMS_PER_PAGE = 20;

const useGetNicknameSearchData = (text, page) => {
  const [serverState, request, loading] = useFetch();
  const [nicknameData, setNicknameData] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  const prevTextRef = React.useRef(text);

  React.useEffect(() => {
    const endpoint = `/search/${SEARCH_TYPE.NICKNAME}?text=${text}&page=${page}`;
    request("GET", endpoint, null);
  }, [text, page]);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        if (prevTextRef.current !== text) {
          // 검색어가 변경되면 데이터 초기화
          setNicknameData(serverState.rows);
        } else {
          // 페이지가 변경될 때 기존 데이터에 추가
          setNicknameData((prev) => [...prev, ...serverState.rows]);
        }
        setHasMoreContent(serverState.rows.length >= ITEMS_PER_PAGE);
        prevTextRef.current = text; // 현재 검색어 저장
        break;
      case 400:
      case 404:
      case 500:
        console.error(`Error ${serverState.status}: ${serverState.message}`);
        break;
      default:
        console.warn("Unexpected server response:", serverState);
        break;
    }
  }, [serverState]);

  return [nicknameData, loading, hasMoreContent];
};

export default useGetNicknameSearchData;
