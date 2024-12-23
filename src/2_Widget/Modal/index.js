import React, { useEffect } from "react";
import STYLE from "./style";
import useModal from "./model/useModal";
import TrackingImage from "../../../../2_Widget/TrackingImage";

const Modal = (props) => {
  const { children, onClose, snap, modalOpen } = props;
  const { data, lineWeight, setLineWeight, lineColor, setLineColor } =
    props.traking;

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
            <TrackingImage data={data} />
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
                // 저장 로직
                onClose();
              }}>
              저장하기
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                // 공유 로직
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
