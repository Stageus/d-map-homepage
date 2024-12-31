import React, { useState } from "react";
import STYLE from "./style";

import Modal from "../../../../2_Widget/Modal";
import TrackContainer from "./ui/TrackContainer";

import useModifyTrackingModal from "./model/useModifyTrackingModal";

const TrackTabSlider = (props) => {
  const { modifyMode, handleToggleSharing, handleDeleteAdd, tabIndex } = props;
  const { trackData, getLengthSharing } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal();

  const [longPressData, setLongPressData] = useState(null);

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          <STYLE.PostGrid>
            {getLengthSharing(0) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              trackData?.map(
                (track) =>
                  track.sharing === 0 && (
                    <TrackContainer
                      track={track}
                      modifyMode={modifyMode}
                      handleDeleteAdd={handleDeleteAdd}
                      handleToggleSharing={handleToggleSharing}
                      setLongPressData={setLongPressData}
                      handleModifyTrackingOpen={handleModifyTrackingOpen}
                    />
                  )
              )
            )}
          </STYLE.PostGrid>
          <STYLE.PostGrid>
            {getLengthSharing(1) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              trackData?.map(
                (track) =>
                  track.sharing === 1 && (
                    <TrackContainer
                      track={track}
                      modifyMode={modifyMode}
                      handleDeleteAdd={handleDeleteAdd}
                      handleToggleSharing={handleToggleSharing}
                      setLongPressData={setLongPressData}
                      handleModifyTrackingOpen={handleModifyTrackingOpen}
                    />
                  )
              )
            )}
          </STYLE.PostGrid>
        </STYLE.Slider>
      </STYLE.SliderWrapper>
      {modifyTrackingModal && longPressData && (
        <Modal onClose={handleModifyTrackingClose} trackData={longPressData} />
      )}
    </>
  );
};

export default TrackTabSlider;
