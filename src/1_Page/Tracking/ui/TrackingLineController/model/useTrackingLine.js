import React from "react";
import useTrackingLineAtom from "../../../../../4_Shared/Recoil/useTrackingLineAtom";
import getCurrentLocation from "../../../lib/getCurrentLocation";
import useIsTrackingAtom from "../../../../../4_Shared/Recoil/useIsTrackingAtom";

const useTrackingLine = () => {
  const [isTracking] = useIsTrackingAtom();
  const [trackingLine, setTrackingLine] = useTrackingLineAtom(); // line
  const currentRecordingTrackingLineRef = React.useRef([]);
  const recordedTrackingLineRef = React.useRef(trackingLine);
  const undoStackRef = React.useRef([]);

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
  const undoTrackingLine = () => {
    console.log("Before Undo:", recordedTrackingLineRef.current, currentRecordingTrackingLineRef.current);
  
    // recordedTrackingLineRef에서 처리
    if (currentRecordingTrackingLineRef.current.length === 0) {
      if (recordedTrackingLineRef.current.length === 0) {
        console.warn("Nothing to undo");
        return; // 아무것도 없으면 리턴
      }
  
      const lastLine = recordedTrackingLineRef.current[recordedTrackingLineRef.current.length - 1];
  
      if (lastLine.length === 1) {
        // 마지막 라인이 1개만 있으면 pop
        undoStackRef.current.push(lastLine[0]);
        recordedTrackingLineRef.current.pop();
      } else {
        // 마지막 배열의 마지막 요소 제거
        undoStackRef.current.push(lastLine.pop());
      }
    } else {
      // currentRecordingTrackingLineRef 처리
      const lastPoint = currentRecordingTrackingLineRef.current.pop();
      undoStackRef.current.push(lastPoint);
    }
  
    // 상태 업데이트
    setTrackingLine([...recordedTrackingLineRef.current]);
    console.log("After Undo:", recordedTrackingLineRef.current, currentRecordingTrackingLineRef.current);
  };
  
  const redoTrackingLine = () => {};

  return [trackingLine, resetTrackingLine, undoTrackingLine];
};

export default useTrackingLine;
