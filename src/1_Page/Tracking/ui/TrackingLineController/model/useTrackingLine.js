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
        localStorage.setItem(
          "trackingLine",
          JSON.stringify(recordedTrackingLineRef.current)
        );
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
    undoStackRef.current = [];
    localStorage.removeItem("trackingLine");
    setTrackingLine([]); // trackingLine 초기화
    currentRecordingTrackingLineRef.current = [];
    recordedTrackingLineRef.current = [];
  };
  const undoTrackingLine = () => {
    console.log(recordedTrackingLineRef.current);
    let length = recordedTrackingLineRef.current.length;
    if (length <= 0) return;
    let recorded = [...recordedTrackingLineRef.current];
    console.log(recorded[length - 1]);
    let lastRecorded;

    console.log(recorded[length - 1]);
    if (recorded[length - 1].length > 1) {
      lastRecorded = [...recorded[length - 1]];
    } else if (recorded[length - 1].length === 1) {
      lastRecorded = [recorded[length - 1]];
    }
    console.log(lastRecorded);

    if (lastRecorded.length > 0) {
      undoStackRef.current.push(lastRecorded.pop());
      recorded.pop();
      recorded = [...recorded, lastRecorded];
    } else {
      recorded.pop();
    }

    recordedTrackingLineRef.current = recorded;
    setTrackingLine(recordedTrackingLineRef.current);
  };

  let redoTrackingLine = () => {
    let undoStack = [...undoStackRef.current];
    if (undoStack.length <= 0) return;
    let length = recordedTrackingLineRef.current.length;
    let recorded = [...recordedTrackingLineRef.current];
    console.log(length, recorded);
    if (length > 0) {
      if (recorded[length - 1].length > 1) {
        recorded[length - 1] = [...recorded[length - 1], undoStack.pop()];
        recordedTrackingLineRef.current = recorded;
        setTrackingLine(recordedTrackingLineRef.current);
      } else if (recorded[length - 1].length === 1) {
        recorded[0] = [undoStack.pop()];
        recordedTrackingLineRef.current = recorded;
        setTrackingLine(recordedTrackingLineRef.current);
      }
    } else {
      recorded = [undoStack.pop()];
      recordedTrackingLineRef.current = recorded;
      setTrackingLine(recordedTrackingLineRef.current);
    }

    undoStackRef.current = undoStack;
    console.log(undoStackRef.current);
  };

  return [trackingLine, resetTrackingLine, undoTrackingLine, redoTrackingLine];
};

export default useTrackingLine;
