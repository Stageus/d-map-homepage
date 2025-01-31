import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useHandleModal from "./model/useHandleModal";
import usePostTrackingImage from "../../3_Entity/Tracking/usePostTrackingImage";
import usePutTrackingImage from "../../3_Entity/Tracking/usePutTrackingImage";
import MAPTYPE from "../../4_Shared/constant/mapType";
import useNewTrackingData from "./model/useNewTrackingData";
import useAuthenticator from "../../4_Shared/lib/useAuthenticator";
import { useNavigate } from "react-router-dom";

const ModifyTrackingImageModal = (props) => {
  const { onClose, trackData } = props;
  const [newTrackingData, setNewTrackingData] = useNewTrackingData(trackData);
  const sheetRef = React.useRef();
  const mapRef = React.useRef(null);
  const {
    isVisible,
    translateY,
    isDraggingRef,
    handleClose,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useHandleModal(onClose, sheetRef);
  const [postTrackingImage] = usePostTrackingImage();
  const [putTrackingImage] = usePutTrackingImage();
  const [isLogin] = useAuthenticator();
  const navigate = useNavigate();

  return (
    <div>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
        ref={sheetRef}
        $isVisible={isVisible}
        $translateY={translateY}
        $isDragging={isDraggingRef.current}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <STYLE.Handle />
        {!isLogin ? (
          <STYLE.Container>
            <p>로그인이 필요한 서비스 입니다.</p>
            <hr />
            <STYLE.Button
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인 하러 가기
            </STYLE.Button>
          </STYLE.Container>
        ) : (
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
                  mapRef.current = map;
                }}
                options={{
                  mapTypeId: MAPTYPE[newTrackingData.background],
                  disableDefaultUI: true,
                  zoom: newTrackingData.zoom,
                  center: newTrackingData.center,
                  heading: newTrackingData.heading,
                }}
              >
                {newTrackingData.line?.map((elem, idx) => (
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
              }}
            >
              <label htmlFor="lineWidth">선 굵기</label>
              <STYLE.SliderModify
                id="lineWidth"
                type="range"
                min="1"
                max="10"
                value={newTrackingData.thickness}
                onChange={(e) => {
                  setNewTrackingData({
                    thickness: Number(e.target.value),
                    center: mapRef.current.getCenter().toJSON(),
                    zoom: mapRef.current.getZoom(),
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
                    color: e.target.value,
                    center: mapRef.current.getCenter().toJSON(),
                    zoom: mapRef.current.getZoom(),
                  });
                }}
              />
            </STYLE.SliderContainer>
            <STYLE.ButtonContainer>
              <STYLE.Button
                onClick={async () => {
                  newTrackingData.idx === -1
                    ? postTrackingImage({
                        ...newTrackingData,
                        center: mapRef.current.getCenter().toJSON(),
                        zoom: mapRef.current.getZoom(),
                      }) // tracking image 생성
                    : putTrackingImage({
                        ...newTrackingData,
                        center: mapRef.current.getCenter().toJSON(),
                        zoom: mapRef.current.getZoom(),
                      }); // tracking image 수정
                  handleClose();
                }}
              >
                저장하기
              </STYLE.Button>
              <STYLE.Button
                onClick={async () => {
                  newTrackingData.idx === -1
                    ? postTrackingImage({
                        ...newTrackingData,
                        center: mapRef.current.getCenter().toJSON(),
                        zoom: mapRef.current.getZoom(),
                        sharing: true,
                      }) // tracking image 생성
                    : putTrackingImage({
                        ...newTrackingData,
                        sharing: true,
                        center: mapRef.current.getCenter().toJSON(),
                        zoom: mapRef.current.getZoom(),
                      }); // tracking image 수정
                  handleClose();
                }}
              >
                저장 및 공유하기
              </STYLE.Button>
            </STYLE.ButtonContainer>
          </STYLE.Container>
        )}
      </STYLE.Sheet>
    </div>
  );
};

export default ModifyTrackingImageModal;
