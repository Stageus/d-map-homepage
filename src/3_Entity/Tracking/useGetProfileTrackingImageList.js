import React, { useEffect, useRef } from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 20;

const CATEGORY_MAP = {
  0: "share",
  1: "save",
  // 나중에 카테고리가 늘어나면 여기 추가 가능
};

const useGetProfileTrackingImageList = (userIdx, pages, tabIndex) => {
  const [serverState, request, loading] = useFetch();
  const [trackingImageList, setTrackingImageList] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState({});

  // 이전 요청 기록을 저장하는 ref
  const previousRequests = useRef(new Set());
  useEffect(() => {
    if (!userIdx || !CATEGORY_MAP.hasOwnProperty(tabIndex)) return;
    const sharing = tabIndex === 0 ? 1 : 0;
    const currentPage = pages[tabIndex];
    // 현재 요청 키 생성
    const requestKey = `${userIdx}-${currentPage}-${sharing}`;
    if (previousRequests.current.has(requestKey)) return;
    // 요청 키를 저장하고 API 호출 수행
    previousRequests.current.add(requestKey);
    const endpoint = `/tracking/account/${userIdx}?page=${currentPage}&category=${sharing}`;
    request("GET", endpoint, null);
  }, [userIdx, pages, tabIndex]);

  useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 400:
          console.log(serverState.message);
          break;
        default:
          break;
      }

      if (!CATEGORY_MAP.hasOwnProperty(tabIndex)) return;

      const category = CATEGORY_MAP[tabIndex];
      setTrackingImageList((prevList) => [
        ...prevList,
        ...(serverState.tracking_image || []),
      ]);
      setHasMoreContent((prevContent) => ({
        ...prevContent,
        [category]: (serverState.tracking_image || []).length >= ITEMS_PER_PAGE,
      }));
    }
  }, [loading, serverState]);

  return [trackingImageList, loading, hasMoreContent];
};

export default useGetProfileTrackingImageList;
