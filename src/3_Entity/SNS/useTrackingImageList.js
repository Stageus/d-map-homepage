import React from "react";
import CATEGORY from "../../1_Page/Sns/constant/category";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const createDataArray = (count) => {
  return Array.from({ length: count }, (_, idx) => ({
    idx: idx + 1,
    nickname: `너구리${idx + 1}`,
    image: `www.s3-urlLink~${idx + 1}`,
    line: [
      [
        { lat: 37.57, lng: 126.97 },
        { lat: 37.5715, lng: 126.973 },
        { lat: 37.5725, lng: 126.975 },
        { lat: 37.5715, lng: 126.977 },
        { lat: 37.57, lng: 126.976 },
        { lat: 37.57, lng: 126.97 },
      ],
      [
        { lat: 37.57, lng: 126.97 },
        { lat: 37.5715, lng: 126.975 },
        { lat: 37.572, lng: 126.97 },
        { lat: 37.57, lng: 126.97 },
      ],
      [
        { lat: 37.57, lng: 126.97 },
        { lat: 37.57, lng: 126.975 },
        { lat: 37.571, lng: 126.975 },
        { lat: 37.571, lng: 126.97 },
        { lat: 37.57, lng: 126.97 },
      ],
    ],
    searchpoint: "서울시 종로구",
    center: { lat: 37.57, lng: 126.97 },
    zoom: 15,
    heading: 250,
    sharing: 0,
    likecount: 100 + idx,
    color: idx % 3,
    thickness: 15,
    background: idx % 2,
    liked_by_user: idx % 2 === 0,
  }));
};
const TEMP_DATA = {
  message: createDataArray(10),
};
const useTrackingImageList = (
  category = CATEGORY.DEFAULT,
  userIdx = 0,
  page = 1
) => {
  const [loading, setLoading] = React.useState(true);
  const [trackingImageList, setTrackingImageList] = React.useState([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(false);
  React.useEffect(() => {
    const fetchTrackingImageList = async () => {
      // 1. fetch
      let result = TEMP_DATA;
      try{
        const response = await fetchRequest("GET", `${BASE_URL}/sns/?category=default&page=${1}`, null, TEST_TOKEN);
        console.log(await response.json())
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false);
      }
      if (result.message) setHasMoreContent(true);
      else setHasMoreContent(false);

      // 2. status error handling
      // ...

      // 3. data processing
      if (page !== 1) {
        console.log("reset webgl")
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
          setTrackingImageList(result.message);
        }, 100);
      } else {
        setTrackingImageList(result.message);
      }
      // 4. handle loading
      setLoading(false);
    };

    fetchTrackingImageList();
  }, [category, page]);

  return [trackingImageList, loading, hasMoreContent];
};
export default useTrackingImageList;
