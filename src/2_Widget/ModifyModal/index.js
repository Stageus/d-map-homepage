import React, { useState } from "react";
import STYLE from "./style";
import Track from "../TrackingImage";
import BottomSheet from "../BottomSheet";

const ModifyModal = ({ onSave, onShare, data, onClose }) => {
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("#FF0000");

  return (
    <BottomSheet onClose={onClose}>
      <STYLE.Container>
        <div style={{ width: "100%", height: "60vh", marginBottom: "1rem" }}>
          <Track lineWidth={lineWidth} lineColor={lineColor} />
        </div>
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
          <STYLE.Button onClick={onSave}>저장하기</STYLE.Button>
          <STYLE.Button onClick={onShare}>공유하기</STYLE.Button>
        </STYLE.ButtonContainer>
      </STYLE.Container>
    </BottomSheet>
  );
};

export default ModifyModal;
