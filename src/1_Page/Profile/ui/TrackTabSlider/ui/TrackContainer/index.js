import React, { useEffect, useState } from "react";
import STYLE from "./style";

import TrackingImage from "./ui/TrackingImage";
// import TrackingImage from "./ui/TrackingImage copy";
import useLongPressEvent from "./model/useLongPressEvent";

const TrackContainer = (props) => {
  const {
    track,
    modifyMode,
    setLongPressData,
    handle: {
      handleDeleteAdd,
      handleToggleTrackType,
      handleModifyTrackingOpen,
    },
  } = props;

  const { handleNextPage } = props;

  const { index } = props;
  const { resetState, setResetState } = props;

  const { isScroll } = props;

  const longPressEvents = useLongPressEvent(() => {
    handleModifyTrackingOpen();
    setLongPressData(track);
  }, 300);

  return (
    <>
      <STYLE.TrackingContainer {...(!modifyMode && longPressEvents)}>
        <TrackingImage
          index={index}
          handleNextPage={handleNextPage}
          resetState={resetState}
          setResetState={setResetState}
          data={{ ...track, height: "100%", draggable: false }}
          isScroll={isScroll}
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
