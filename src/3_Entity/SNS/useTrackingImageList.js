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
            //result = TEMP_DATA
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
      if (true) {
        console.log("reset webgl");
        const canvases = document.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          // canvas가 WebGL 컨텍스트를 가지고 있다면 초기화
          const context =
            canvas.getContext("webgl") || canvas.getContext("webgl2");

          if (context) {
            // WebGL 컨텍스트 초기화
            context.getExtension("WEBGL_lose_context")?.loseContext();
          }
        });
        setTrackingImageList([]);
        setTimeout(() => {
          setTrackingImageList([...result]);
        }, 200);
      } else {
        setTrackingImageList(result);
      }
      // 4. handle loading
      setLoading(false);
    };
    fetchTrackingImageList();
  }, [category, page]);

  return [trackingImageList, loading, hasMoreContent];
};
export default useTrackingImageList;
