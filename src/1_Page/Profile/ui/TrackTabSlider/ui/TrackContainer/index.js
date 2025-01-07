import React, { useEffect, useState } from "react";
import STYLE from "./style";

import TrackingImage from "./ui/TrackingImage";
// import TrackingImage from "../../../../../../2_Widget/TrackingImage";
import useLongPressEvent from "./model/useLongPressEvent";
import { useInView } from "react-intersection-observer";

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

  const { index } = props;
  const { setInView } = props;
  const { resetState, setResetState } = props;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const [wasInView, setWasInView] = useState(false);

  useEffect(() => {
    if (inView && !wasInView) {
      setInView((prev) => Math.min(prev + 1, 15)); // 최대값 제한
    } else if (!inView && wasInView) {
      setInView((prev) => Math.max(prev - 1, 0)); // 최소값 제한
    }
    setWasInView(inView);
  }, [inView, wasInView]);

  const longPressEvents = useLongPressEvent(() => {
    handleModifyTrackingOpen();
    setLongPressData(track);
  }, 1000);

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        {inView && (
          <STYLE.TrackingContainer {...(!modifyMode && longPressEvents)}>
            <TrackingImage
              index={index}
              resetState={resetState}
              setResetState={setResetState}
              data={{ ...track, height: "100%", draggable: false }}
              inView={inView}
              setInView={setInView}
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
        )}
      </div>
    </>
  );
};

export default TrackContainer;
