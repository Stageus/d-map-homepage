import React, { useMemo } from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";
import useLongPressEvent from "../../../../4_Shared/useLongPressEvent";

const TrackContainer = (props) => {
  const { data, checkSetMode, author } = props;
  const { handleModifyMapOpen, setPinchedData } = props;

  const longPressEvents = useLongPressEvent(
    () => {
      handleModifyMapOpen();
      setPinchedData(data);
      console.log("꾸욱");
    }, // 꾸욱 누르기 시작 시 모달 열기
    null, // 꾸욱 누르기를 끝낼 때 동작 (필요 시 추가)
    1000 // 1초 꾸욱 누르기 감지
  );

  // Tracking 컴포넌트를 useMemo로 메모이제이션
  const memoizedTracking = useMemo(() => {
    return <Tracking data={{ ...data, height: "100%" }} />;
  }, [data]);

  return (
    <STYLE.TrackingContainer {...(author && longPressEvents)}>
      {checkSetMode && <STYLE.TrackingCheckbox />}
      {memoizedTracking} {/* 메모이제이션된 Tracking */}
    </STYLE.TrackingContainer>
  );
};

export default TrackContainer;
