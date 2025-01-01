import React from "react";
const BASE_URL = "SERVER URL";

const useUnLikeTrackingImage = (trackingImageIdx) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTrackingImageList = async () => {
      // 1. fetch
      //let result = TEMP_DATA;

      // 2. status error handling
      // ...

      // 3. data processing

      // 4. handle loading
      setLoading(false);
    };

    fetchTrackingImageList();
  }, [trackingImageIdx]);

  return [loading];
};
export default useUnLikeTrackingImage;
