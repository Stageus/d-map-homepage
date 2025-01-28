import React from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import StaticTrackingImage from "../../../../../../2_Widget/StaticTrackingImage";
import ModifyTrackingImageModal from "../../../../../../2_Widget/ModifyTrackingImageModal";

import useLongPressEvent from "./model/useLongPressEvent";
import useConfirmModal from "../../../../../../4_Shared/model/useModalHandler";
import useModalHandler from "../../../../../../4_Shared/model/useModalHandler";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";
import useSelectTrack from "./model/useSelectTrack";

const TrackingImageContainer = React.memo((props) => {
  const {
    trackingImageData,
    modifyMode,
    setDisplayTrackingImage,
    setModifyIdxList,
    obServeRef,
  } = props;

  const [isModifyTrackingModalOpen, modifyTrackingModalToggle] =
    useConfirmModal();
  const [isTrackingPost, handleTrackingPost] = useModalHandler();

  const { selectLongPressData, longPressEvents } = useLongPressEvent(
    modifyTrackingModalToggle,
    trackingImageData
  );

  const [clickTrackEvent] = useSelectTrack(
    setDisplayTrackingImage,
    setModifyIdxList
  );

  return (
    <>
      <STYLE.TrackingContainer
        ref={obServeRef}
        onClick={modifyMode ? undefined : handleTrackingPost}
        {...(!modifyMode && trackingImageData?.isMine && longPressEvents)}>
        {trackingImageData.idx}
        <StaticTrackingImage
          height="100%"
          mapInfo={{
            ...trackingImageData,
            draggable: false,
            background: 0,
            zoom: trackingImageData.zoom / 1.5,
          }}
        />

        {modifyMode === "공유" && (
          <STYLE.TrackingClickBox
            onClick={() => {
              clickTrackEvent(trackingImageData, false);
            }}
          />
        )}
        {modifyMode === "삭제" && (
          <STYLE.TrackingCheckbox
            onChange={() => {
              clickTrackEvent(trackingImageData, true);
            }}
          />
        )}
      </STYLE.TrackingContainer>

      {isModifyTrackingModalOpen &&
        selectLongPressData &&
        ReactDOM.createPortal(
          <ModifyTrackingImageModal
            onClose={modifyTrackingModalToggle}
            trackData={selectLongPressData}
          />,
          document.body // Portal로 이동
        )}

      {isTrackingPost &&
        ReactDOM.createPortal(
          <STYLE.ModalOverlay onClick={handleTrackingPost}>
            <STYLE.ModalContent onClick={(e) => e.stopPropagation()}>
              <STYLE.CloseButton onClick={handleTrackingPost}>
                &times;
              </STYLE.CloseButton>
              <TrackingImagePostList trackingImageList={[trackingImageData]} />
            </STYLE.ModalContent>
          </STYLE.ModalOverlay>,
          document.body // Portal로 이동
        )}
    </>
  );
});

export default TrackingImageContainer;
