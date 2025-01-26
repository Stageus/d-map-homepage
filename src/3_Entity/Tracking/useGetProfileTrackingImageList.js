import React from "react";
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

  React.useEffect(() => {
    if (!userIdx) return;
    const endpoint = `/tracking/account/${userIdx}?page=${page}&category=${sharing}`;
    request("GET", endpoint, null, TEST_TOKEN);
  }, [userIdx, page, sharing]);

  React.useEffect(() => {
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
