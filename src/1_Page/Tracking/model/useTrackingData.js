import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";

const useTrackingData = (trackingDataRef) => {
  const [trackingData, setTrackingData] = React.useState({
    zoom: 15,
    center: { lat: 37.57, lng: 126.97 },
    heading: 120,
  });
  const throttledSetTrackingData = useThrottle(() => {
    setTrackingData({ ...trackingDataRef?.current });
  }, 700);
  return [trackingData, throttledSetTrackingData];
};

export default useTrackingData;
