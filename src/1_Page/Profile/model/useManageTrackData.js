import { useState, useEffect } from "react";
import { categorizeTrackData, removeDuplicateData } from "../lib/profileUtil";

const useManageTrackData = (trackingImageData = [], modifyMode) => {
  // 상태 선언
  const [backupTrackingImageData, setBackupTrackingImageData] = useState(null);
  const [displayTrackingImage, setDisplayTrackingImage] = useState({
    private: [],
    public: [],
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
      setBackupTrackingImageData((prev) => {
        const combinedData = removeDuplicateData([
          ...prev.private,
          ...prev.public,
          ...trackingImageData,
        ]);
        const categorized = categorizeTrackData(combinedData);
        return {
          private: categorized.private,
          public: categorized.public,
        };
      });
    }
  }, [trackingImageData]);

  useEffect(() => {
    const combinedData = removeDuplicateData([
      ...displayTrackingImage.private,
      ...displayTrackingImage.public,
      ...trackingImageData,
    ]);
    const addedData = combinedData.filter(
      (item) =>
        !displayTrackingImage.private.includes(item) &&
        !displayTrackingImage.public.includes(item)
    );
    const categorized = categorizeTrackData(addedData);
    setDisplayTrackingImage((prev) => ({
      private: [...prev.private, ...categorized.private],
      public: [...prev.public, ...categorized.public],
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
