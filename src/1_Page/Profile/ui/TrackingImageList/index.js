import React from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";
import usePinchEvent from "../../../../4_Shared/usePinchEvent";

const Track = (props) => {
  const { data, checkSetMode, author } = props;
  const { handleModifyOpen } = props;
  const pinchEvents = usePinchEvent(
    handleModifyOpen, // 꾸욱 누르기 시작 시 모달 열기
    null, // 꾸욱 누르기를 끝낼 때 동작 (필요 시 추가)
    1000 // 1초 꾸욱 누르기 감지
  );
  return (
    <STYLE.TrackingContainer {...pinchEvents}>
      {checkSetMode && <STYLE.TrackingCheckbox />}
      <Tracking data={data} height={"100%"} />
    </STYLE.TrackingContainer>
  );
};

export default Track;
