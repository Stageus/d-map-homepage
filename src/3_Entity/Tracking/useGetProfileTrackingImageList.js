import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 20;

const CATEGORY_MAP = {
  0: "public",
  1: "private",
};

const useGetProfileTrackingImageList = (userIdx, page, tabIndex) => {
  const [serverState, request, loading] = useFetch();
  const [trackingImageList, setTrackingImageList] = useState([]);
  const [hasMoreContent, setHasMoreContent] = useState({});

  // 이전 요청 키 저장
  const previousRequests = useRef(new Set());

  useEffect(() => {
    if (!userIdx) return;

    const category = tabIndex === 0 ? 1 : 0;
    const requestKey = `${userIdx}-${page}-${category}`;
    // 이미 요청된 페이지인지 확인
    if (previousRequests.current.has(requestKey)) return;

    previousRequests.current.add(requestKey);
    const endpoint = `/tracking/account/${userIdx}?page=${page}&category=${category}`;
    request("GET", endpoint);
  }, [userIdx, page, tabIndex]);

  useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 400:
        console.log(serverState.message);
        return;
      default:
        break;
    }

    const category = CATEGORY_MAP[tabIndex];
    const newImages = serverState.tracking_image || [];
    // 새로운 데이터를 기존 데이터에 추가
    setTrackingImageList((prevList) => [...prevList, ...newImages]);

    // 현재 카테고리의 다음 페이지 여부 설정
    setHasMoreContent((prevContent) => ({
      ...prevContent,
      [category]: newImages.length >= ITEMS_PER_PAGE,
    }));
  }, [serverState, tabIndex]);

  return [trackingImageList, loading, hasMoreContent];
};

export default useGetProfileTrackingImageList;
