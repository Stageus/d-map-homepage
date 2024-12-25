import React, { useState } from "react";
import STYLE from "./style";

import useModifyTrackingModal from "./model/useModifyTrackingModal";

import Modal from "../../../../2_Widget/Modal";
import Tracking from "../../../../2_Widget/TrackingImage";
import useLongPressEvent from "../../../../4_Shared/useLongPressEvent";

const TrackContainer = (props) => {
  const { track, modifyMode, author } = props;
  const { handleAnotherType } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal();

  const [pinchedData, setPinchedData] = useState(null);

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
      <STYLE.TrackingContainer {...(author && !modifyMode && longPressEvents)}>
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
      {modifyTrackingModal && pinchedData && (
        <Modal onClose={handleModifyTrackingClose} trackData={pinchedData} />
      )}
    </>
  );
};

export default TrackContainer;
