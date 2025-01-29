import { useState, useCallback } from "react";
import {
  calculateTrackingLength,
  extractIdxLists,
  filterTrackData,
} from "../../../lib/profileUtil";

const useUpdateTrackingImage = (
  setDisplayTrackingImage,
  setModifyIdxList,
  backupTrackingImageData
) => {
  const [changeTrackingImageDataLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });

  const resetSelection = useCallback(() => {
    setModifyIdxList([]);
    setDisplayTrackingImage(backupTrackingImageData);
  }, [backupTrackingImageData]);

  const modifyTrackEvent = useCallback((modifyIdxList, isToShare) => {
    const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
    setModifyIdxList([]);
    setChangeTrackingLength((prev) => {
      if (isToShare) {
        return {
          ...prev,
          save: calculateTrackingLength(prev.save, idxToShare, idxToNotShare),
        };
      } else {
        return {
          ...prev,
          share: calculateTrackingLength(prev.share, idxToShare, idxToNotShare),
        };
      }
    });
  }, []);

  const deleteTrackEvent = useCallback((modifyIdxList) => {
    const saveCount = modifyIdxList.filter((item) => !item.sharing).length; // sharing이 false인 경우 save
    const shareCount = modifyIdxList.filter((item) => item.sharing).length; // sharing이 true인 경우 share
    const idxList = modifyIdxList.map((item) => item.idx);
    setChangeTrackingLength((prev) => ({
      save: prev.save - saveCount,
      share: prev.share - shareCount,
    }));
    setDisplayTrackingImage((prev) => filterTrackData(prev, idxList));
    setModifyIdxList([]);
  }, []);

  return [
    changeTrackingImageDataLength,
    resetSelection,
    modifyTrackEvent,
    deleteTrackEvent,
  ];
};

export default useUpdateTrackingImage;
