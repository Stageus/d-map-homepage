import React, { useState } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useModal from "./model/useModal";

const Modal = (props) => {
  const { children, onClose, snap } = props;
  const { trackData } = props;

  const [lineInfo, setLineInfo] = useState({
    lineWeight: 2,
    lineColor: "#FF0000",
  });
  const handleLineSet = (changeLine) => {
    setLineInfo((prev) => ({ ...prev, changeLine }));
  };

  const {
    isVisible,
    translateY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClose,
    elementRef,
  } = useModal(onClose, snap);

  const handleLoad = (map) => {
    if (trackData) {
      map.setOptions({
        zoom: trackData.zoom,
        center: trackData.center,
        heading: trackData.heading,
      });
    }
  };

  return (
    <>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
        ref={elementRef}
        className={isVisible && "open"}
        style={{
          transform: `translateY(${isVisible ? translateY : "600"}px)`,
          transition: !isDragging.current ? "transform 0.3s ease-out" : "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <STYLE.Handle />
        {trackData && (
          <STYLE.Container>
            <STYLE.MapContainer
              onTouchStart={(e) => {
                e.stopPropagation();
              }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "400px",
                }}
                onLoad={handleLoad}
                options={{
                  mapId: "90f87356969d889c",
                  disableDefaultUI: true,
                }}>
                {trackData.line?.map((elem, idx) => (
                  <Polyline
                    key={idx}
                    path={elem}
                    options={{
                      strokeColor: lineInfo.lineColor,
                      strokeOpacity: 0.8,
                      strokeWeight: lineInfo.lineWeight,
                    }}
                  />
                ))}
              </GoogleMap>
            </STYLE.MapContainer>
            <STYLE.SliderContainer
              onTouchStart={(e) => {
                e.stopPropagation();
              }}>
              <label htmlFor="lineWidth">선 굵기</label>
              <STYLE.SliderModify
                id="lineWidth"
                type="range"
                min="1"
                max="10"
                value={lineInfo.lineWeight}
                onChange={(e) =>
                  handleLineSet({ lineWeight: Number(e.target.value) })
                }
              />
            </STYLE.SliderContainer>
            <STYLE.SliderContainer>
              <label htmlFor="lineColor">색 선택</label>
              <STYLE.ColorPicker
                id="lineColor"
                type="color"
                value={lineInfo.lineColor}
                onChange={(e) => handleLineSet({ lineColor: e.target.value })}
              />
            </STYLE.SliderContainer>
            <STYLE.ButtonContainer>
              <STYLE.Button
                onClick={() => {
                  handleClose();
                }}>
                저장하기
              </STYLE.Button>
              <STYLE.Button
                onClick={() => {
                  handleClose();
                }}>
                공유하기
              </STYLE.Button>
            </STYLE.ButtonContainer>
          </STYLE.Container>
        )}
        {children && children({ handleClose })}
      </STYLE.Sheet>
    </>
  );
};

export default Modal;
