import React, { useEffect, useRef } from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;
const ITEMS_PER_PAGE = 20;

const useGetProfileTrackingImageList = (userIdx, page, sharing) => {
  const [serverState, request, loading] = useFetch();
  const [trackingImageList, setTrackingImageList] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState({
    save: false,
    share: false,
  });

  // 이전 요청 기록을 저장하는 ref
  const previousRequests = useRef(new Set());

  useEffect(() => {
    if (!userIdx) return;
    // 현재 요청 키 생성
    const requestKey = `${userIdx}-${page}-${sharing}`;
    // 이전에 동일한 요청이 있었으면 API 호출 방지
    if (previousRequests.current.has(requestKey)) return;
    // 요청 키를 저장하고 API 호출 수행
    previousRequests.current.add(requestKey);
    const endpoint = `/tracking/account/${userIdx}?page=${page}&category=${sharing}`;
    request("GET", endpoint, null, TEST_TOKEN);
  }, [userIdx, page, sharing]);

  useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 400:
          console.log(serverState.message);
          break;
        default:
          break;
      }

      const key = sharing === 1 ? "share" : "save";
      setTrackingImageList((prevList) => [
        ...prevList,
        ...(serverState.tracking_image || []),
      ]);
      setHasMoreContent((prevContent) => ({
        ...prevContent,
        [key]: (serverState.tracking_image || []).length >= ITEMS_PER_PAGE,
      }));
    }
  }, [loading, serverState]);

  return [trackingImageList, loading, hasMoreContent];
};

export default useGetProfileTrackingImageList;
