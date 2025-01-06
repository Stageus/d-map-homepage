import React from "react";
import CATEGORY from "../../1_Page/Sns/constant/category";
const BASE_URL = "SERVER URL";
const TEMP_DATA = {
  message: [
    {
      idx: 123,
      nickname: "행복한너구리",
      image: "www.s3-urlLink~",
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
      likecount: 121,
      color: 0,
      thickness: 15,
      background: 0,
      nickname: "화난너구리",
      image: "S3 URL 이 들어갑니다.",
      liked_by_user: true,
    },
    {
      idx: 131,
      nickname: "행복한너구리",
      image: "www.s3-urlLink~",
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
      searchpoint: "인천광역시 미추홀구",
      center: { lat: 37.57, lng: 126.97 },
      zoom: 10,
      heading: 250,
      sharing: 0,
      likecount: 223,
      color: 0,
      thickness: 15,
      background: 0,
      nickname: "화난너구리",
      image: "S3 URL 이 들어갑니다.",
      liked_by_user: false,
    },
    {
      idx: 150,
      nickname: "용감한너구리",
      image: "www.s3-urlLink-v4~",
      line: [
        [
          { lat: 37.565, lng: 126.98 },
          { lat: 37.566, lng: 126.982 },
          { lat: 37.567, lng: 126.984 },
          { lat: 37.566, lng: 126.986 },
          { lat: 37.565, lng: 126.985 },
          { lat: 37.565, lng: 126.98 },
        ],
        [
          { lat: 37.565, lng: 126.98 },
          { lat: 37.5665, lng: 126.985 },
          { lat: 37.567, lng: 126.98 },
          { lat: 37.565, lng: 126.98 },
        ],
      ],
      searchpoint: "서울시 서대문구",
      center: { lat: 37.565, lng: 126.98 },
      zoom: 13,
      heading: 90,
      sharing: 1,
      likecount: 312,
      color: 2,
      thickness: 8,
      background: 1,
      liked_by_user: true,
    },
    {
      idx: 155,
      nickname: "느긋한너구리",
      image: "www.s3-urlLink-v5~",
      line: [
        [
          { lat: 37.62, lng: 127.01 },
          { lat: 37.621, lng: 127.013 },
          { lat: 37.622, lng: 127.015 },
          { lat: 37.621, lng: 127.017 },
          { lat: 37.62, lng: 127.016 },
          { lat: 37.62, lng: 127.01 },
        ],
        [
          { lat: 37.62, lng: 127.01 },
          { lat: 37.6215, lng: 127.015 },
          { lat: 37.622, lng: 127.01 },
          { lat: 37.62, lng: 127.01 },
        ],
      ],
      searchpoint: "서울시 성북구",
      center: { lat: 37.62, lng: 127.01 },
      zoom: 11,
      heading: 270,
      sharing: 0,
      likecount: 87,
      color: 4,
      thickness: 6,
      background: 3,
      liked_by_user: false,
    },
  ],
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
      if (result.message) setHasMoreContent(true);
      else setHasMoreContent(false);

      // 2. status error handling
      // ...

      // 3. data processing
      if (trackingImageList.length > 12) {
        // const canvases = document.querySelectorAll("canvas");

        // canvases.forEach((canvas) => {
        //   // canvas가 WebGL 컨텍스트를 가지고 있다면 초기화
        //   const context =
        //     canvas.getContext("webgl") || canvas.getContext("webgl2");

        //   if (context) {
        //     // WebGL 컨텍스트 초기화
        //     context.getExtension("WEBGL_lose_context")?.loseContext();
        //   }
        // });
        setTrackingImageList(result.message);
      } else {
        setTrackingImageList((prevList) => [
          ...prevList,
          ...result.message,
        ]);
      }

      // 4. handle loading
      setLoading(false);
    };

    fetchTrackingImageList();
  }, [category, page]);

  return [trackingImageList, loading, hasMoreContent, trackingImageList.length];
};
export default useTrackingImageList;
