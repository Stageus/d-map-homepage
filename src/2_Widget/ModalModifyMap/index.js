import React, { useState } from "react";
import STYLE from "./style";
import Tracking from "../TrackingImage";
import BottomSheet from "../BottomSheet";

const ModalModifyMap = ({ onSave, onShare, data, onClose }) => {
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("#FF0000");

  return (
    <BottomSheet onClose={onClose} snap={[0.3]}>
      {({ handleClose }) => (
        <STYLE.Container>
          <STYLE.MapContainer>
            <Tracking data={data} lineWidth={lineWidth} lineColor={lineColor} />
          </STYLE.MapContainer>
          <STYLE.SliderContainer>
            <label htmlFor="lineWidth">선 굵기</label>
            <STYLE.Slider
              id="lineWidth"
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
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
                // onSave();
                handleClose();
              }}>
              저장하기
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                // onShare();
                handleClose();
              }}>
              공유하기
            </STYLE.Button>
          </STYLE.ButtonContainer>
        </STYLE.Container>
      )}
    </BottomSheet>
  );
};

export default ModalModifyMap;
