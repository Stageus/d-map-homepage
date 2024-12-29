import React from "react";
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
  ],
};

const useTrackingImageList = (category, page = 1) => {
  const [loading, setLoading] = React.useState(true);
  const [trackingImageList, setTrackingImageList] = React.useState([]);

  React.useEffect(() => {
    const fetchTrackingImageList = async () => {
      // 1. fetch
      let result = TEMP_DATA;

      // 2. status error handling
      // ...

      // 3. data processing
      await setTrackingImageList((prevList) => [
        ...prevList,
        ...result.message,
      ]);

      // 4. handle loading
      setLoading(false);
    };

    fetchTrackingImageList();
  }, [category, page]);

  return [trackingImageList, loading];
};
export default useTrackingImageList;
