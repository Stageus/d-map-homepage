import { useState, useCallback } from "react";
import {
  calculateTrackingLength,
  extractIdxLists,
  filterTrackData,
} from "../../../lib/profileUtil";

const useUpdateTrackingImageEventManager = (
  setDisplayTrackingImage,
  setModifyIdxList,
  backupTrackingImageData
) => {
  const resetSelection = useCallback(() => {
    setModifyIdxList([]);
    setDisplayTrackingImage(backupTrackingImageData);
  }, [backupTrackingImageData]);

  const modifyTrackEvent = useCallback((modifyIdxList, isToShare) => {
    setModifyIdxList([]);
  }, []);

  const deleteTrackEvent = useCallback((idxList) => {
    setDisplayTrackingImage((prev) => filterTrackData(prev, idxList));
    setModifyIdxList([]);
  }, []);

  return [resetSelection, modifyTrackEvent, deleteTrackEvent];
};

export default useUpdateTrackingImageEventManager;
