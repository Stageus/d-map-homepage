import React, { useState, useEffect, useRef } from "react";
import STYLE from "./style";

import Modal from "../../../../2_Widget/Modal";
import TrackContainer from "./ui/TrackContainer";

import useModifyTrackingModal from "./model/useModifyTrackingModal";
import useManageWebGl from "./model/useManageWebgl";

const TrackTabSlider = (props) => {
  const {
    trackData,
    getTrackLength,
    modifyMode,
    tabIndex,
    handle: { handleToggleTrackType, handleDeleteAdd },
  } = props;
  const { page, handleNextPage } = props;
  const { divElement, scrollPosition } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal(); // 트래킹 이미지 수정 모달 관리

  const [longPressData, setLongPressData] = useState(null);

  const [resetState, setResetState] = useState(false);

  const { postFirstTabRef, postSecondTabRef, isScroll, isLoaded } =
    useManageWebGl(tabIndex, page, divElement, scrollPosition);

  const shareTrackData = trackData?.filter((track) => track.sharing === 0);
  const saveTrackData = trackData?.filter((track) => track.sharing === 1);

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          <STYLE.PostGrid ref={postFirstTabRef}>
            {getTrackLength(0) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              <>
                {isLoaded && (
                  <STYLE.LoadingOverlay>
                    <STYLE.Spinner />
                  </STYLE.LoadingOverlay>
                )}
                {shareTrackData?.map(
                  (track, index) =>
                    track.sharing === 0 && (
                      <TrackContainer
                        key={track.id} // 고유 key 필요
                        track={track}
                        index={index}
                        isScroll={isScroll}
                        handleNextPage={
                          shareTrackData.length === index + 1
                            ? handleNextPage
                            : null
                        }
                        resetState={resetState}
                        setResetState={setResetState}
                        modifyMode={modifyMode}
                        handle={{
                          handleDeleteAdd,
                          handleToggleTrackType,
                          handleModifyTrackingOpen,
                        }}
                        setLongPressData={setLongPressData}
                      />
                    )
                )}
              </>
            )}
          </STYLE.PostGrid>
          <STYLE.PostGrid ref={postSecondTabRef}>
            {getTrackLength(1) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              saveTrackData?.map(
                (track, index) =>
                  track.sharing === 1 && (
                    <TrackContainer
                      key={track.id} // 고유 key 필요
                      track={track}
                      index={index}
                      isScroll={isScroll}
                      handleNextPage={
                        saveTrackData.length === index + 1
                          ? handleNextPage
                          : null
                      }
                      resetState={resetState}
                      setResetState={setResetState}
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
