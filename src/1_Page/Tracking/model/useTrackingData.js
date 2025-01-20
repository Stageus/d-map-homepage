import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";
import useTrackingDataAtom from "../../../4_Shared/Recoil/useTrackingDataAtom";
import getCurrentLocation from "../lib/getCurrentLocation";

const useTrackingData = (mapRef) => {
  const [trackingData, setTrackingData] = useTrackingDataAtom();

  const throttledSetTrackingData = useThrottle(() => {
    if (mapRef.current) {
      try {
        const newData = {
          idx: -1,
          zoom: mapRef.current.getZoom(),
          center: mapRef.current.getCenter().toJSON(),
          heading: mapRef.current.getHeading(),
          searchpoint: "temp",
          sharing: false,
          color: trackingData.color,
          thickness: trackingData.thickness,
          background: trackingData.background,
        };

        // 상태 업데이트
        setTrackingData(newData);
      } catch (error) {
        console.error(error);
      }
    }
  }, 100);


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

  return [trackingData, throttledSetTrackingData, setTrackingData];
};

export default useTrackingData;
