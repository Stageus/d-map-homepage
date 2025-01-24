import { useMemo } from "react";

const useTrackDataLength = (
  userInfo,
  activeTabStr,
  changeShareTrackingLength,
  changeSaveTrackingLength
) => {
  return useMemo(() => {
    const { share_tracking_length = 0, total_tracking_length = 0 } =
      userInfo || {};

    const adjustedShareTracking =
      share_tracking_length - changeShareTrackingLength;
    const adjustedSaveTracking =
      total_tracking_length - share_tracking_length - changeSaveTrackingLength;

    return activeTabStr === "공유"
      ? adjustedShareTracking
      : adjustedSaveTracking;
  }, [
    userInfo,
    activeTabStr,
    changeShareTrackingLength,
    changeSaveTrackingLength,
  ]);
};

export default useTrackDataLength;
