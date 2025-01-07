import React, { useState, useEffect } from "react";
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
  const { handleNextPage } = props;

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal(); // 트래킹 이미지 수정 모달 관리

  const [longPressData, setLongPressData] = useState(null);
  const [inViewCount, setInView] = useState(0);

  const [resetState, setResetState] = useState(false);

  const cleanupMap = async () => {
    const canvases = document.querySelectorAll("canvas");
    if (canvases.length === 0) {
      return;
    }
    for (const canvas of canvases) {
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (context) {
        const extension = context.getExtension("WEBGL_lose_context");
        if (extension) {
          await extension.loseContext(); // 컨텍스트 손실
        }
        // 손실된 컨텍스트에서 추가 호출 방지
        if (context.isContextLost()) {
          console.warn("WebGL context is lost. Skipping further operations.");
          continue;
        }
      }
    }
    setResetState(true); // 상태 업데이트
  };

  // inViewCount 변경 시 컴포넌트 초기화
  useEffect(() => {
    cleanupMap();
  }, [inViewCount]);

  const shareTrackData = trackData?.filter((track) => track.sharing === 0);
  const saveTrackData = trackData?.filter((track) => track.sharing === 1);

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          <STYLE.PostGrid>
            {getTrackLength(0) === 0 ? (
              <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
            ) : (
              shareTrackData?.map(
                (track, index) =>
                  track.sharing === 0 && (
                    <TrackContainer
                      key={track.id} // 고유 key 필요
                      track={track}
                      index={index}
                      handleNextPage={
                        shareTrackData.length === index + 1
                          ? handleNextPage
                          : null
                      }
                      resetState={resetState}
                      setResetState={setResetState}
                      modifyMode={modifyMode}
                      setInView={setInView}
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
              saveTrackData?.map(
                (track, index) =>
                  track.sharing === 1 && (
                    <TrackContainer
                      key={track.id} // 고유 key 필요
                      track={track}
                      index={index}
                      handleNextPage={
                        saveTrackData.length === index + 1
                          ? handleNextPage
                          : null
                      }
                      resetState={resetState}
                      setResetState={setResetState}
                      modifyMode={modifyMode}
                      setInView={setInView}
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
