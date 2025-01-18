import React from "react";
import CATEGORY from "../../1_Page/Sns/constant/category";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;
const ITEMS_PER_PAGE = 20;

const useTrackingImageList = (category = CATEGORY.DEFAULT, page) => {
  const [loading, setLoading] = React.useState(true);
  const [trackingImageList, setTrackingImageList] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);

  React.useEffect(() => {
    const fetchTrackingImageList = async () => {
      let result = [];
      try {
        // fetch
        const response = await fetchRequest(
          "GET",
          `${BASE_URL}/sns/?category=${category}&page=${page}`,
          null,
          TEST_TOKEN
        );

        const data = await response.json();
        // status handling
        switch (response.status) {
          case 200:
            result = data.tracking_image;
            console.log(result, page);
            break;
          case 400:
          case 404:
          case 500:
          default:
            console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      // is there more contents?
      setHasMoreContent(result.length >= ITEMS_PER_PAGE);

      // data processing
      setTrackingImageList((prev)=>[...prev, ...result]);
      
      // 4. handle loading
      setLoading(false);
    };
    fetchTrackingImageList();
  }, [category, page]);

  return [trackingImageList, loading, hasMoreContent];
};
export default useTrackingImageList;
