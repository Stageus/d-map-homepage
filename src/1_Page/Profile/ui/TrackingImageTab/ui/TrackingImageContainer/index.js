import React from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import TrackingImage from "../../../../../../2_Widget/TrackingImage";
import ModifyTrackingImageModal from "../../../../../../2_Widget/ModifyTrackingImageModal";

import useLongPressEvent from "./model/useLongPressEvent";
import useConfirmModal from "../../../../../../4_Shared/model/useModalHandler";
import { useNavigate } from "react-router-dom";

const TrackingImageContainer = (props) => {
  const { track, modifyMode, handleAddModifyIdxList } = props;

  const [modifyTrackingModal, modifyTrackingModalToggle] = useConfirmModal();

  const { selectLongPressData, longPressEvents } = useLongPressEvent(
    modifyTrackingModalToggle,
    track
  );
  const navigate = useNavigate();

  return (
    <>
      <STYLE.TrackingContainer
        onClick={() => {
          navigate(`/sns/${track.idx}`);
        }}
        {...(!modifyMode && track?.isMine && longPressEvents)}>
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
        selectLongPressData &&
        ReactDOM.createPortal(
          <ModifyTrackingImageModal
            onClose={modifyTrackingModalToggle}
            trackData={selectLongPressData}
          />,
          document.body // Portal로 이동
        )}
    </>
  );
};

export default TrackingImageContainer;
