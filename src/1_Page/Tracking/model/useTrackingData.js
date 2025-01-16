import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";
import useTrackingDataAtom from "../../../4_Shared/Recoil/useTrackingDataAtom";

const useTrackingData = (mapRef) => {
  const [trackingData, setTrackingData] = useTrackingDataAtom();

  const throttledSetTrackingData = useThrottle(() => {
    if (mapRef.current) {
      const data = {
        zoom: mapRef.current?.getZoom(),
        center: mapRef.current?.getCenter().toJSON(),
        heading: mapRef.current?.getHeading(),
        searchPoint: "서울시 종로구",
        sharing: false,
        lineColor: "#FF0000",
        lineWeight: 2,
      };
      setTrackingData(data);
    }
    
  }, 100);
  return [trackingData, throttledSetTrackingData];
};

export default useTrackingData;
