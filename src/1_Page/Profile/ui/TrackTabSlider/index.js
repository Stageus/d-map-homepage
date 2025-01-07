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

  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal(); // 트래킹 이미지 수정 모달 관리

  const [longPressData, setLongPressData] = useState(null);
  const [inViewCount, setInView] = useState(0);

  const [resetState, setResetState] = useState(false);

  // WebGL 컨텍스트 초기화
  const cleanupMap = () => {
    const canvases = document.querySelectorAll("canvas");
    if (canvases.length === 0) {
      console.log("초기화할 캔버스가 없습니다.");
      return;
    }
    canvases.forEach((canvas) => {
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (context) {
        const extension = context.getExtension("WEBGL_lose_context");
        if (extension) {
          extension.loseContext();
          setResetState(true);
        }
      }
    });
  };

  // inViewCount 변경 시 컴포넌트 초기화
  useEffect(() => {
    console.log("inViewCount:", inViewCount);
    if (inViewCount <= 0) return;
    cleanupMap();
  }, [inViewCount]);

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
                      key={track.id} // 고유 key 필요
                      track={track}
                      index={index}
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
              trackData?.map(
                (track, index) =>
                  track.sharing === 1 && (
                    <TrackContainer
                      key={track.id} // 고유 key 필요
                      track={track}
                      index={index}
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
