import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useHandleModal from "./model/useHandleModal";
import useDeleteTrackingImage from "../../3_Entity/Tracking/useDeleteTrackingImage";
import usePostTrackingImage from "../../3_Entity/Tracking/usePostTrackingImage";
import usePutTrackingImage from "../../3_Entity/Tracking/usePutTrackingImage";

const Modal = (props) => {
  const { children, onClose, trackData } = props;
  const [newTrackingData, setNewTrackingData] = React.useState(trackData);
  const sheetRef = React.useRef();
  const { isVisible, translateY, isDraggingRef, handleClose } = useHandleModal(
    onClose,
    sheetRef
  );
  const [postTrackingImage] = usePostTrackingImage(newTrackingData);
  //const putTrackingImage = usePutTrackingImage();
  // const deleteTrackingImage = useDeleteTrackingImage();

  return (
    <>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
        ref={sheetRef}
        $isVisible={isVisible}
        $translateY={translateY}
        $isDragging={isDraggingRef.current}
      >
        <STYLE.Handle />
        {trackData && (
          <STYLE.Container>
            {/* google map */}
            <STYLE.MapWrapper
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "400px",
                }}
                onLoad={(map) => {
                  if (trackData) {
                    map.setOptions({
                      zoom: trackData.zoom,
                      center: trackData.center,
                      heading: trackData.heading,
                    });
                  }
                }}
                options={{
                  mapId: "90f87356969d889c",
                  disableDefaultUI: true,
                }}
              >
                {trackData.line?.map((elem, idx) => (
                  <Polyline
                    key={idx}
                    path={elem}
                    options={{
                      strokeColor: newTrackingData.lineColor,
                      strokeOpacity: 0.8,
                      strokeWeight: newTrackingData.lineWeight,
                    }}
                  />
                ))}
              </GoogleMap>
            </STYLE.MapWrapper>

            {/* slider */}
            <STYLE.SliderContainer
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <label htmlFor="lineWidth">선 굵기</label>
              <STYLE.SliderModify
                id="lineWidth"
                type="range"
                min="1"
                max="10"
                value={newTrackingData.lineWeight}
                onChange={(e) =>
                  setNewTrackingData({ ...newTrackingData, lineWeight: Number(e.target.value) })
                }
              />
            </STYLE.SliderContainer>
            <STYLE.SliderContainer>
              <label htmlFor="lineColor">색 선택</label>
              <STYLE.ColorPicker
                id="lineColor"
                type="color"
                value={newTrackingData.lineColor}
                onChange={(e) => setNewTrackingData({ ...newTrackingData, lineColor: e.target.value })}
              />
            </STYLE.SliderContainer>
            <STYLE.ButtonContainer>
              <STYLE.Button
                onClick={() => {
                  postTrackingImage(newTrackingData);
                  handleClose();
                }}
              >
                저장하기
              </STYLE.Button>
              <STYLE.Button
                onClick={() => {
                  handleClose();
                }}
              >
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
