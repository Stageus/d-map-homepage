import React from "react";
import useTrackingLineAtom from "../../../../../4_Shared/Recoil/useTrackingLineAtom";
import getCurrentLocation from "../../../lib/getCurrentLocation";
import useIsTrackingAtom from "../../../../../4_Shared/Recoil/useIsTrackingAtom";

const useTrackingLine = () => {
  const [isTracking] = useIsTrackingAtom();
  const [trackingLine, setTrackingLine] = useTrackingLineAtom(); // line
  const currentRecordingTrackingLineRef = React.useRef([]);
  const recordedTrackingLineRef = React.useRef(trackingLine);

  React.useEffect(() => {
    const prevLine = recordedTrackingLineRef.current;

    const updateTrackingLine = async () => {
      const newTrackingSpot = await getCurrentLocation();
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

        setTrackingLine(recordedTrackingLineRef.current);
      }
    };

    let intervalId;
    if (isTracking) {
      intervalId = setInterval(updateTrackingLine, 1500); // 1.5초마다 위치 업데이트
    } else {
      currentRecordingTrackingLineRef.current = []; // 추적이 중지되면 기록 초기화
    }

    // 컴포넌트가 unmount될 때 타이머 정리
    return () => clearInterval(intervalId);
  }, [isTracking, setTrackingLine]); // isTracking이나 isInteractingMapRef가 바뀔 때마다 실행

  const resetTrackingLine = () => {
    setTrackingLine([]); // trackingLine 초기화
    currentRecordingTrackingLineRef.current = [];
    recordedTrackingLineRef.current = [];
  };

  return [trackingLine, resetTrackingLine];
};

export default useTrackingLine;
