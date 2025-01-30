import { useCallback } from "react";
import { filterTrackData } from "../../../../../lib/profileUtil";

const useUpdateTrackingImageEventManager = (
  setDisplayTrackingImage,
  setModifyIdxList,
  backupTrackingImageData,
  handleCloseMode,
  confirmModalToggle,
  fetchUserInfo
) => {
  const resetSelection = useCallback(() => {
    setModifyIdxList([]);
    setDisplayTrackingImage(backupTrackingImageData);
  }, [backupTrackingImageData]);

  const modifyTrackEvent = async () => {
    await fetchUserInfo();
    setModifyIdxList([]);
    handleCloseMode();
    confirmModalToggle();
  };

  const deleteTrackEvent = async (idxList) => {
    await fetchUserInfo();
    setDisplayTrackingImage((prev) => filterTrackData(prev, idxList));
    setModifyIdxList([]);
    handleCloseMode();
    confirmModalToggle();
  };

  return [resetSelection, modifyTrackEvent, deleteTrackEvent];
};

export default useUpdateTrackingImageEventManager;
