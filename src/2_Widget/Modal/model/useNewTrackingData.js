import React from "react";
import useThrottle from "../../../4_Shared/util/useThrottle";

const useNewTrackingData = (trackingData) => {
  const [newTrackingData, setNewTrackingData] = React.useState(trackingData);

  const throttledSetNewTrackingData = useThrottle((newData)=>{
    setNewTrackingData({ ...newTrackingData, ...newData });
  }, 100)

  const modifyNewTrackingData = (newData) => {
    setNewTrackingData({ ...newTrackingData, ...newData });
  }

  return [newTrackingData, modifyNewTrackingData];
};

export default useNewTrackingData;
