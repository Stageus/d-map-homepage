import React from "react";
import STYLE from "./style";

import Tracking from "../../../../../../2_Widget/TrackingImage";
import useLongPressEvent from "../../../../../../4_Shared/useLongPressEvent";

const TrackContainer = (props) => {
  const { track, modifyMode } = props;
  const { handleAnotherType, setPinchedData, handleModifyTrackingOpen } = props;

  const longPressEvents = useLongPressEvent(
    () => {
      handleModifyTrackingOpen();
      setPinchedData(track);
    },
    null,
    1000
  );

  return (
    <>
      <STYLE.TrackingContainer {...(!modifyMode && longPressEvents)}>
        <Tracking dragable={false} data={{ ...track, height: "100%" }} />
        {modifyMode === "공유" && (
          <STYLE.TrackingClickBox
            onClick={() => {
              handleAnotherType(track);
            }}
          />
        )}
        {modifyMode === "삭제" && <STYLE.TrackingCheckbox />}
      </STYLE.TrackingContainer>
    </>
  );
};

export default TrackContainer;
