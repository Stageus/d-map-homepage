import React from "react";

const useTrackingSpot = (
  isTracking,
  currentRecordingTrackingLineRef,
  recordedTrackingLineRef
) => {
  const [trackingSpot, setTrackingSpot] = React.useState(null);

  React.useEffect(() => {
    const prevLine = recordedTrackingLineRef.current;

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newTrackingSpot = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setTrackingSpot(newTrackingSpot);

            if (currentRecordingTrackingLineRef.current) {
              currentRecordingTrackingLineRef.current = [
                ...currentRecordingTrackingLineRef.current,
                newTrackingSpot,
              ];

              recordedTrackingLineRef.current = [...prevLine, currentRecordingTrackingLineRef.current]
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    let intervalId;

    if (isTracking) {
      intervalId = setInterval(getLocation, 1000);
    } else {
      setTrackingSpot(null);
      currentRecordingTrackingLineRef.current = [];
    }

    // 컴포넌트가 unmount될 때 타이머 정리
    return () => clearInterval(intervalId);
  }, [isTracking]);

  return [trackingSpot];
};

export default useTrackingSpot;
