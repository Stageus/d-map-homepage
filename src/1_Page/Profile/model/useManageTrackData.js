import { useState, useEffect } from "react";
import { categorizeTrackData, removeDuplicateData } from "../lib/profileUtil";

const useManageTrackData = (trackingImageData = []) => {
  // 상태 선언
  const [displayTrackingImage, setDisplayTrackingImage] = useState({
    save: [],
    share: [],
  });

  useEffect(() => {
    const combinedData = removeDuplicateData([
      ...displayTrackingImage.save,
      ...displayTrackingImage.share,
      ...trackingImageData,
    ]);
    const categroized = categorizeTrackData(combinedData);
    setDisplayTrackingImage(categroized);
  }, [trackingImageData]);

  // 선택된 트랙 업데이트

  return [displayTrackingImage, setDisplayTrackingImage];
};

export default useManageTrackData;
