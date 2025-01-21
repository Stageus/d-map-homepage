import React from "react";
import useTrackingDataAtom from "../../../4_Shared/Recoil/useTrackingDataAtom";
import getCurrentLocation from "../lib/getCurrentLocation";

const useTrackingData = () => {
  const [trackingData, setTrackingData] = useTrackingDataAtom();

  React.useEffect(() => {
    const initializeLocation = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setTrackingData({ ...trackingData, center: currentLocation });
      } catch (error) {
        console.error("Error initializing location:", error);
      }
    };

    initializeLocation();
  }, []); // 최초 mount 시 위치 초기화

  return [trackingData, setTrackingData];
};

export default useTrackingData;
