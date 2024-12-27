import React, { useState } from "react";
import STYLE from "./style";

import Modal from "../../../../2_Widget/Modal";
import TrackContainer from "./ui/TrackContainer";

import useModifyTrackingModal from "./model/useModifyTrackingModal";

const TrackTabSlider = (props) => {
  const { modifyMode, handleAnotherType, tabIndex } = props;
  const { shareData, saveData } = props.data;

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
            {shareData?.length === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              shareData?.map((track) => (
                <TrackContainer
                  track={track}
                  modifyMode={modifyMode}
                  handleAnotherType={handleAnotherType}
                  setLongPressData={setLongPressData}
                  handleModifyTrackingOpen={handleModifyTrackingOpen}
                />
              ))
            )}
          </STYLE.PostGrid>
          <STYLE.PostGrid>
            {saveData?.length === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              saveData?.map((track) => (
                <TrackContainer
                  track={track}
                  modifyMode={modifyMode}
                  handleAnotherType={handleAnotherType}
                  setLongPressData={setLongPressData}
                  handleModifyTrackingOpen={handleModifyTrackingOpen}
                />
              ))
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
