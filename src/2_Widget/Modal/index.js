import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useHandleModal from "./model/useHandleModal";
import postTrackingImage from "../../3_Entity/Tracking/postTrackingImage";
import putTrackingImage from "../../3_Entity/Tracking/putTrackingImage";
import MAPTYPE from "../../4_Shared/constant/mapType";

const Modal = (props) => {
  const { children, onClose, trackData } = props;
  const [newTrackingData, setNewTrackingData] = React.useState(trackData);
  const sheetRef = React.useRef();
  const mapRef = React.useRef(null);
  const { isVisible, translateY, isDraggingRef, handleClose } = useHandleModal(
    onClose,
    sheetRef
  );

  return (
    <>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
        ref={sheetRef}
        $isVisible={isVisible}
        $translateY={translateY}
        $isDragging={isDraggingRef.current}>
        <STYLE.Handle />
        <STYLE.Container>
          {/* google map */}
          <STYLE.MapWrapper
            onTouchStart={(e) => {
              e.stopPropagation();
            }}>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              options={{
                mapTypeId: MAPTYPE[trackData.background],
                disableDefaultUI: true,
                zoom: trackData.zoom,
                center: trackData.center,
                heading: trackData.heading,
              }}>
              {trackData.line?.map((elem, idx) => (
                <Polyline
                  key={idx}
                  path={elem}
                  options={{
                    strokeColor: newTrackingData.color,
                    strokeOpacity: 0.8,
                    strokeWeight: newTrackingData.thickness,
                  }}
                />
              ))}
            </GoogleMap>
          </STYLE.MapWrapper>

          {/* slider */}
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
              value={newTrackingData.thickness}
              onChange={(e) => {
                console.log(e.target.value);
                setNewTrackingData({
                  ...newTrackingData,
                  thickness: Number(e.target.value),
                });
              }}
            />
          </STYLE.SliderContainer>
          <STYLE.SliderContainer>
            <label htmlFor="lineColor">색 선택</label>
            <STYLE.ColorPicker
              id="lineColor"
              type="color"
              value={newTrackingData.color}
              onChange={(e) => {
                setNewTrackingData({
                  ...newTrackingData,
                  color: e.target.value,
                });
              }}
            />
          </STYLE.SliderContainer>
          <STYLE.ButtonContainer>
            <STYLE.Button
              onClick={() => {
                newTrackingData.idx === -1
                  ? postTrackingImage(newTrackingData)
                  : putTrackingImage(newTrackingData);
                handleClose();
              }}>
              저장하기
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                // toSharing api
                handleClose();
              }}>
              공유하기
            </STYLE.Button>
          </STYLE.ButtonContainer>
        </STYLE.Container>

        {children && children({ handleClose })}
      </STYLE.Sheet>
    </>
  );
};

export default Modal;
