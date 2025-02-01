import React from "react";
import CATEGORY from "../../1_Page/Sns/constant/category";
import { useFetch } from "../../4_Shared/util/apiUtil";
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;
const ITEMS_PER_PAGE = 20;

const useGetTrackingImageList = (category = CATEGORY.DEFAULT, page) => {
  const [serverState, request, loading] = useFetch();
  const [trackingImageList, setTrackingImageList] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  const prevCategory = React.useRef(category);

  React.useEffect(() => {
    if(category !== prevCategory.current){
      setTrackingImageList([]);
      prevCategory.current = category
    }
    request(
      "GET",
      `/sns/?category=${category}&page=${page}`,
      null,
      TEST_TOKEN
    );
  }, [category, page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 400:
          console.log(serverState.message);
          break;
        default:
          console.log(page)
          break;
      }
      setTrackingImageList((prev)=>[...prev, ...serverState.tracking_image]);
      setHasMoreContent(
        (serverState.tracking_image || []).length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [trackingImageList, loading, hasMoreContent];
};

export default useGetTrackingImageList;