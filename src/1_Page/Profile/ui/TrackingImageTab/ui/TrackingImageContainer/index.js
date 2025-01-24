import React from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import StaticTrackingImage from "../../../../../../2_Widget/StaticTrackingImage";
import ModifyTrackingImageModal from "../../../../../../2_Widget/ModifyTrackingImageModal";

import useLongPressEvent from "./model/useLongPressEvent";
import useConfirmModal from "../../../../../../4_Shared/model/useModalHandler";
import useModalHandler from "../../../../../../4_Shared/model/useModalHandler";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";

const TrackingImageContainer = (props) => {
  const { trackingImageData, modifyMode, handleAddModifyIdxList } = props;

  const [isModifyTrackingModalOpen, modifyTrackingModalToggle] =
    useConfirmModal();
  const [isTrackingPost, handleTrackingPost] = useModalHandler();

  const { selectLongPressData, longPressEvents } = useLongPressEvent(
    modifyTrackingModalToggle,
    trackingImageData
  );

  return (
    <>
      <STYLE.TrackingContainer
        onClick={modifyMode ? undefined : handleTrackingPost}
        {...(!modifyMode && trackingImageData?.isMine && longPressEvents)}>
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
              handleAddModifyIdxList(trackingImageData, false);
            }}
          />
        )}
        {modifyMode === "삭제" && (
          <STYLE.TrackingCheckbox
            onChange={() => {
              handleAddModifyIdxList(trackingImageData, true);
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
              {console.log(trackingImageData)}
              <TrackingImagePostList trackingImageList={[trackingImageData]} />
            </STYLE.ModalContent>
          </STYLE.ModalOverlay>,
          document.body // Portal로 이동
        )}
    </>
  );
};

export default TrackingImageContainer;
