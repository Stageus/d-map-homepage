import React, { useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useModal from "./model/useModal";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Modal = (props) => {
  const { children, onClose, snap, modalOpen } = props;
  const { data } = props;
  const [lineWeight, setLineWeight] = useState(2);
  const [lineColor, setLineColor] = useState("#FF0000");

  const {
    isVisible,
    translateY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useModal(onClose, snap, modalOpen);

  return (
    <STYLE.Sheet
      className={isVisible && "open"}
      style={{
        transform: `translateY(${isVisible ? translateY : "600"}px)`,
        transition: !isDragging.current ? "transform 0.3s ease-out" : "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}>
      <STYLE.Handle />
      {data ? (
        <STYLE.Container>
          <STYLE.MapContainer>
            <LoadScript googleMapsApiKey={API_KEY}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: data.height || "400px",
                }}
                options={{
                  zoom: data.zoom || 15,
                  center: data.center || { lat: 37.57, lng: 126.97 },
                  heading: data.heading || 0,
                  mapId: "90f87356969d889c",
                  disableDefaultUI: true,
                }}>
                {data.line?.map((elem, idx) => (
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
            </LoadScript>
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
                onClose();
              }}>
              저장하기
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                onClose();
              }}>
              공유하기
            </STYLE.Button>
          </STYLE.ButtonContainer>
        </STYLE.Container>
      ) : (
        children
      )}
    </STYLE.Sheet>
  );
};

export default Modal;
