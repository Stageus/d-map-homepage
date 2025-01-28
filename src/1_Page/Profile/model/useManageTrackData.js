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
    const addedData = combinedData.filter(
      (item) =>
        !displayTrackingImage.save.includes(item) &&
        !displayTrackingImage.share.includes(item)
    );
    const categorized = categorizeTrackData(addedData);
    setDisplayTrackingImage((prev) => ({
      save: [...prev.save, ...categorized.save],
      share: [...prev.share, ...categorized.share],
    }));
  }, [trackingImageData]);
  // 선택된 트랙 업데이트

  return [displayTrackingImage, setDisplayTrackingImage];
};

export default useManageTrackData;
