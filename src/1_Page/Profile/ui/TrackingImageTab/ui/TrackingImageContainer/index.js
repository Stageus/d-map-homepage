import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import TrackingImage from "../../../../../../2_Widget/TrackingImage";
import Modal from "../../../../../../2_Widget/Modal";

import useLongPressEvent from "./model/useLongPressEvent";
import useConfirmModal from "../../../../../../4_Shared/model/useModalHandler";

const TrackingImageContainer = (props) => {
  const { track, modifyMode, handleAddModifyIdxList } = props;

  const [
    modifyTrackingModal,
    handleModifyTrackingOpen,
    handleModifyTrackingClose,
  ] = useConfirmModal();
  const [longPressData, setLongPressData] = useState(null);

  const longPressEvents = useLongPressEvent(() => {
    handleModifyTrackingOpen();
    setLongPressData(track);
  }, 1000);

  return (
    <>
      <STYLE.TrackingContainer {...(!modifyMode && longPressEvents)}>
        <p>{track.idx}</p>
        <TrackingImage
          data={{ ...track, height: "100%", draggable: false, background: 0 }}
        />
        {modifyMode === "공유" && (
          <STYLE.TrackingClickBox
            onClick={() => {
              handleAddModifyIdxList(track, false);
            }}
          />
        )}
        {modifyMode === "삭제" && (
          <STYLE.TrackingCheckbox
            onChange={() => {
              handleAddModifyIdxList(track, true);
            }}
          />
        )}
      </STYLE.TrackingContainer>
      {modifyTrackingModal &&
        longPressData &&
        ReactDOM.createPortal(
          <Modal
            onClose={handleModifyTrackingClose}
            trackData={longPressData}
          />,
          document.body // Portal로 이동
        )}
    </>
  );
};

export default TrackingImageContainer;
