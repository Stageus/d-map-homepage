import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";
import useTrackingDataAtom from "../../../4_Shared/Recoil/useTrackingDataAtom";

const useTrackingData = (trackingDataRef) => {
  const [trackingData, setTrackingData] = useTrackingDataAtom();
  const syncTrackingData = () => {
    setTrackingData({ ...trackingDataRef?.current });
  }
  return [trackingData, syncTrackingData];
};

export default useTrackingData;
