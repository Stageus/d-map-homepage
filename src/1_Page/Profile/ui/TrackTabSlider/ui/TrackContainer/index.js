import React from "react";
import STYLE from "./style";

import TrackingImage from "./ui/TrackingImage";
// import TrackingImage from "../../../../../../2_Widget/TrackingImage";
import useLongPressEvent from "./model/useLongPressEvent";

const TrackContainer = (props) => {
  const {
    track,
    modifyMode,
    setLongPressData,
    id,
    handle: {
      handleDeleteAdd,
      handleToggleTrackType,
      handleModifyTrackingOpen,
    },
  } = props;

  const longPressEvents = useLongPressEvent(() => {
    handleModifyTrackingOpen();
    setLongPressData(track);
  }, 1000);

  return (
    <>
      <STYLE.TrackingContainer {...(!modifyMode && longPressEvents)}>
        <TrackingImage
          data={{ ...track, height: "100%", draggable: false }}
          id={id}
        />
        {modifyMode === "공유" && (
          <STYLE.TrackingClickBox
            onClick={() => {
              handleToggleTrackType(track);
            }}
          />
        )}
        {modifyMode === "삭제" && (
          <STYLE.TrackingCheckbox
            onChange={() => {
              handleDeleteAdd(track);
            }}
          />
        )}
      </STYLE.TrackingContainer>
    </>
  );
};

export default TrackContainer;
