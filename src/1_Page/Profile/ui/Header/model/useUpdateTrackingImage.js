import { useEffect, useState, useCallback } from "react";
import {
  calculateTrackingLength,
  categorizeTrackData,
  extractIdxLists,
  filterTrackData,
} from "../../../lib/profileUtil";

const useUpdateTrackingImage = (
  displayTrackingImage,
  setDisplayTrackingImage,
  setModifyIdxList,
  modifyMode
) => {
  const [memorizedTrackData, setMemorizedTrackData] = useState(null);

  const [changeTrackingImageDataLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });

  useEffect(() => {
    if (modifyMode) {
      setMemorizedTrackData(categorizeTrackData(displayTrackingImage));
    }
  }, [modifyMode]);

  const resetSelection = useCallback(() => {
    setModifyIdxList([]);
    setDisplayTrackingImage(memorizedTrackData);
  }, [memorizedTrackData]);

  const handleModifyTrack = useCallback(
    (modifyIdxList, isToShare) => {
      const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
      resetSelection();
      setChangeTrackingLength((prev) =>
        calculateTrackingLength(prev, idxToShare, idxToNotShare)
      );
    },
    [resetSelection]
  );

  const handleDeleteTrack = useCallback(
    (modifyIdxList) => {
      const idxList = modifyIdxList.map((item) => item.idx);
      setChangeTrackingLength((prev) =>
        calculateTrackingLength(prev, [], idxList)
      );
      setDisplayTrackingImage((prev) => filterTrackData(prev, idxList));
      resetSelection();
    },
    [resetSelection]
  );

  return [
    changeTrackingImageDataLength,
    resetSelection,
    handleModifyTrack,
    handleDeleteTrack,
  ];
};

export default useUpdateTrackingImage;
