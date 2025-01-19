import React from "react";

const useNewTrackingData = (trackingData) => {
  const [newTrackingData, setNewTrackingData] = React.useState(trackingData);

  const modifyNewTrackingData = (newData) => {
    setNewTrackingData({ ...newTrackingData, ...newData });
  };

  return [newTrackingData, modifyNewTrackingData];
};

export default useNewTrackingData;
