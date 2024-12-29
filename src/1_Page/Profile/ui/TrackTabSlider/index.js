import React, { useState } from "react";
import STYLE from "./style";

import Modal from "../../../../2_Widget/Modal";
import TrackContainer from "./ui/TrackContainer";

import useModifyTrackingModal from "./model/useModifyTrackingModal";

const TrackTabSlider = (props) => {
  const { modifyMode, handleAnotherType, tabIndex } = props;
  const { data } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal();

  const getLength = (isShared) =>
    data.filter((track) => track.sharing === isShared).length;

  const [longPressData, setLongPressData] = useState(null);

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          <STYLE.PostGrid>
            {getLength(0) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              data?.map(
                (track) =>
                  track.sharing === 0 && (
                    <TrackContainer
                      track={track}
                      modifyMode={modifyMode}
                      handleAnotherType={handleAnotherType}
                      setLongPressData={setLongPressData}
                      handleModifyTrackingOpen={handleModifyTrackingOpen}
                    />
                  )
              )
            )}
          </STYLE.PostGrid>
          <STYLE.PostGrid>
            {getLength(1) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              data?.map(
                (track) =>
                  !track.sharing === 1 && (
                    <TrackContainer
                      track={track}
                      modifyMode={modifyMode}
                      handleAnotherType={handleAnotherType}
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
