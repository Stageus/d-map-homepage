import React from "react";

const useIsTracking = () => {
  const [isTracking, setIsTracking] = React.useState(false);

  const toggleIsTracking = () => {
    setIsTracking(!isTracking);
  };

  return [isTracking, toggleIsTracking];
};

export default useIsTracking;
