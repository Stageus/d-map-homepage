import { useCallback } from "react";
import { filterTrackData } from "../../../../../lib/profileUtil";

const useUpdateTrackingImageEventManager = (
  setDisplayTrackingImage,
  setModifyIdxList,
  backupTrackingImageData,
  handleCloseMode,
  confirmModalToggle
) => {
  const resetSelection = useCallback(() => {
    console.log(backupTrackingImageData);
    setModifyIdxList([]);
    setDisplayTrackingImage(backupTrackingImageData);
  }, [backupTrackingImageData]);

  const modifyTrackEvent = () => {
    setModifyIdxList([]);
    handleCloseMode();
    confirmModalToggle();
  };

  const deleteTrackEvent = (idxList) => {
    setDisplayTrackingImage((prev) => filterTrackData(prev, idxList));
    setModifyIdxList([]);
    handleCloseMode();
    confirmModalToggle();
  };

  return [resetSelection, modifyTrackEvent, deleteTrackEvent];
};

export default useUpdateTrackingImageEventManager;
