import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useModal from "./model/useModal";

const Modal = (props) => {
  const { children, onClose, snap } = props;
  const { trackData } = props;
  const [lineWeight, setLineWeight] = useState(2);
  const [lineColor, setLineColor] = useState("#FF0000");

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

  useEffect(() => {
    console.log(translateY);
  }, [translateY]);

  return (
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
          <STYLE.MapContainer>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              options={{
                zoom: trackData.zoom || 15,
                center: trackData.center || { lat: 37.57, lng: 126.97 },
                heading: trackData.heading || 0,
                mapId: "90f87356969d889c",
                disableDefaultUI: true,
              }}>
              {trackData.line?.map((elem, idx) => (
                <Polyline
                  key={idx}
                  path={elem}
                  options={{
                    strokeColor: lineColor,
                    strokeOpacity: 0.8,
                    strokeWeight: lineWeight,
                  }}
                />
              ))}
            </GoogleMap>
          </STYLE.MapContainer>
          <STYLE.SliderContainer>
            <label htmlFor="lineWidth">선 굵기</label>
            <STYLE.SliderModify
              id="lineWidth"
              type="range"
              min="1"
              max="10"
              value={lineWeight}
              onChange={(e) => setLineWeight(Number(e.target.value))}
            />
          </STYLE.SliderContainer>
          <STYLE.SliderContainer>
            <label htmlFor="lineColor">색 선택</label>
            <STYLE.ColorPicker
              id="lineColor"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
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
      {children && children(handleClose)}
    </STYLE.Sheet>
  );
};

export default Modal;
