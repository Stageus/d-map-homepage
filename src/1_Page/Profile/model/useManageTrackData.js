import { useState, useEffect } from "react";
import { categorizeTrackData, removeDuplicateData } from "../lib/profileUtil";

const useManageTrackData = (trackingImageData = [], modifyMode) => {
  // 상태 선언
  const [backupTrackingImageData, setBackupTrackingImageData] = useState(null);
  const [displayTrackingImage, setDisplayTrackingImage] = useState({
    save: [],
    share: [],
  });

  // 1. modifyMode가 변경되면 값을 저장
  useEffect(() => {
    if (modifyMode) {
      setBackupTrackingImageData(displayTrackingImage);
    }
  }, [modifyMode]);
  // 2. modifyMode가 null이 아닌데 trackingImageData가 바뀌었다 -> 값을 추가
  useEffect(() => {
    if (modifyMode) {
      const categorized = categorizeTrackData(trackingImageData);
      setBackupTrackingImageData((prev) => ({
        save: [...prev.save, ...categorized.save],
        share: [...prev.share, ...categorized.share],
      }));
    }
  }, [trackingImageData]);

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

  return [
    displayTrackingImage,
    setDisplayTrackingImage,
    backupTrackingImageData,
  ];
};

export default useManageTrackData;
