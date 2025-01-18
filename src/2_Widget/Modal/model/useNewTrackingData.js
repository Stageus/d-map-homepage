import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";

const useNewTrackingData = (trackingData) => {
  const [newTrackingData, setNewTrackingData] = React.useState(trackingData);

  const syncNewTrackingData = useThrottle((mapRef)=>{
    setNewTrackingData({
      ...newTrackingData,
      center: mapRef?.current.getCenter().toJSON(),
      zoom: mapRef?.current.getZoom(), 
      heading: mapRef?.current.getHeading(),
    })
  }, 100)

  const modifyNewTrackingData = (newData) => {
    console.log({ ...newTrackingData, ...newData })
    setNewTrackingData({ ...newTrackingData, ...newData });
  }

  return [newTrackingData, modifyNewTrackingData, syncNewTrackingData];
};

export default useNewTrackingData;
