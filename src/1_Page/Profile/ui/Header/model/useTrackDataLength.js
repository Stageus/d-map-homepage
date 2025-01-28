import { useMemo } from "react";

const useTrackDataLength = (userInfo, activeTabStr, changeTrackingLength) => {
  return useMemo(() => {
    const { share_tracking_length = 0, total_tracking_length = 0 } =
      userInfo || {};

    const adjustedShareTracking =
      share_tracking_length - changeTrackingLength.share;
    const adjustedSaveTracking =
      total_tracking_length - share_tracking_length - changeTrackingLength.save;

    return activeTabStr === "공유"
      ? adjustedShareTracking
      : adjustedSaveTracking;
  }, [userInfo, activeTabStr, changeTrackingLength]);
};

export default useTrackDataLength;
