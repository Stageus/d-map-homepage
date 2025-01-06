import React, { useState } from "react";
import STYLE from "./style";

import Modal from "../../../../2_Widget/Modal";
import TrackContainer from "./ui/TrackContainer";

import useModifyTrackingModal from "./model/useModifyTrackingModal";

const TrackTabSlider = (props) => {
  const {
    trackData,
    getTrackLength,
    modifyMode,
    tabIndex,
    handle: { handleToggleTrackType, handleDeleteAdd },
  } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal(); // 트래킹 이미지 수정 모달 관리

  const [longPressData, setLongPressData] = useState(null);

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          <STYLE.PostGrid>
            {getTrackLength(0) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              trackData?.map(
                (track, index) =>
                  track.sharing === 0 && (
                    <TrackContainer
                      track={track}
                      id={index}
                      modifyMode={modifyMode}
                      handle={{
                        handleDeleteAdd,
                        handleToggleTrackType,
                        handleModifyTrackingOpen,
                      }}
                      setLongPressData={setLongPressData}
                    />
                  )
              )
            )}
          </STYLE.PostGrid>
          <STYLE.PostGrid>
            {getTrackLength(1) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              trackData?.map(
                (track, index) =>
                  track.sharing === 1 && (
                    <TrackContainer
                      track={track}
                      id={index}
                      modifyMode={modifyMode}
                      handle={{
                        handleDeleteAdd,
                        handleToggleTrackType,
                        handleModifyTrackingOpen,
                      }}
                      setLongPressData={setLongPressData}
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
