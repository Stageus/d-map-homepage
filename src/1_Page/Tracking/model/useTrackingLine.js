import React from "react";
import useTrackingLineAtom from "../../../4_Shared/Recoil/useTrackingLineAtom";

const useTrackingSpot = (isTracking, isInteractingMapRef) => {
  const [trackingLine, setTrackingLine] = useTrackingLineAtom(); // line
  const currentRecordingTrackingLineRef = React.useRef([]);
  const recordedTrackingLineRef = React.useRef(trackingLine);

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
            if (currentRecordingTrackingLineRef.current) {
              currentRecordingTrackingLineRef.current = [
                ...currentRecordingTrackingLineRef.current,
                newTrackingSpot,
              ];
              
              // recordedTrackingLineRef.current을 업데이트
              recordedTrackingLineRef.current = [
                ...prevLine,
                currentRecordingTrackingLineRef.current,
              ];

              // isInteractingMapRef.current 값이 false일 때 trackingLine을 설정
              if (isInteractingMapRef.current === false) {
                setTrackingLine(recordedTrackingLineRef.current); // 새로운 경로 저장
                console.log(newTrackingSpot);
              }
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
      intervalId = setInterval(getLocation, 1500); // 1.5초마다 위치 업데이트
    } else {
      currentRecordingTrackingLineRef.current = []; // 추적이 중지되면 기록 초기화
    }

    // 컴포넌트가 unmount될 때 타이머 정리
    return () => clearInterval(intervalId);
  }, [isTracking, isInteractingMapRef]); // isTracking이나 isInteractingMapRef가 바뀔 때마다 실행

  const resetTrackingLine = () => {
    setTrackingLine([]); // trackingLine 초기화
    currentRecordingTrackingLineRef.current = [];
    recordedTrackingLineRef.current = [];
  };

  return [trackingLine, resetTrackingLine];
};

export default useTrackingSpot;
