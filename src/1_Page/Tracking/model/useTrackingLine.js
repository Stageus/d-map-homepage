import React from "react";
import useTrackingLineAtom from "../../../4_Shared/Recoil/useTrackingLineAtom";

const useTrackingSpot = (isTracking) => {
  const [trackingLine, setTrackingLine] = useTrackingLineAtom(); // line
  const currentRecordingTrackingLineRef = React.useRef([]);
  const recordedTrackingLineRef = React.useRef([]);

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
            console.log(newTrackingSpot);
            if (currentRecordingTrackingLineRef.current) {
              currentRecordingTrackingLineRef.current = [
                ...currentRecordingTrackingLineRef.current,
                newTrackingSpot,
              ];

              recordedTrackingLineRef.current = [
                ...prevLine,
                currentRecordingTrackingLineRef.current,
              ];
              setTrackingLine(recordedTrackingLineRef.current);
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
      currentRecordingTrackingLineRef.current = [];
    }

    // 컴포넌트가 unmount될 때 타이머 정리
    return () => clearInterval(intervalId);
  }, [isTracking]);

  const resetTrackingLine = () => {
    setTrackingLine([]);
  }

  return [trackingLine, resetTrackingLine];
};

export default useTrackingSpot;
