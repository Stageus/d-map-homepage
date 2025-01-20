import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";
import play_icon from "./assets/play.svg";
import pause_icon from "./assets/pause.svg";
import stop_icon from "./assets/stop.svg";
import location_icon from "./assets/location.svg";
import useTrackingLine from "./model/useTrackingLine";
import useIsTrackingAtom from "../../4_Shared/Recoil/useIsTrackingAtom";
import useIsModifyingTrackingAtom from "../../4_Shared/Recoil/useIsModifyingTrackingAtom";
import ModifyTrackingImageModal from "../../2_Widget/ModifyTrackingImageModal";
import MAPTYPE from "../../4_Shared/constant/mapType";
import getCurrentLocation from "./lib/getCurrentLocation";

const Tracking = () => {
  const mapRef = React.useRef(null); // google map instance
  const isInteractingMap = React.useRef(false);
  const [isTracking, toggleTracking] = useIsTrackingAtom();
  const [isModifying, toggleIsModifying] = useIsModifyingTrackingAtom();
  const [trackingData, throttledSetTrackingData, setTrackingData] =
    useTrackingData(mapRef); // zoom / center / heading
  const [trackingLine, resetTrackingLine] = useTrackingLine(
    isTracking,
    isInteractingMap
  );
  return (
    <STYLE.TrackingPageContainer>
      {/* map instance */}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onIdle={() => {
          throttledSetTrackingData();
          isInteractingMap.current = false;
        }}
        onDragStart={() => {
          isInteractingMap.current = true;
        }}
        onZoomChanged={() => {
          isInteractingMap.current = true;
        }}
        options={{
          disableDefaultUI: true,
          heading: trackingData.heading,
          zoom: trackingData.zoom,
          center: trackingData.center,
          mapTypeId: MAPTYPE[trackingData.background],
        }}
      >
        {/* 선 그리기 */}
        {trackingLine.map((elem, index) => {
          return (
            <Polyline
              key={index}
              path={elem}
              options={{
                strokeColor: trackingData.color,
                strokeOpacity: 0.8,
                strokeWeight: trackingData.thickness,
              }}
            />
          );
        })}
      </GoogleMap>

      {/* Tracking Control Panel*/}
      <STYLE.TrackingControlBtnContainer>
        {!isTracking ? (
          <STYLE.TrackingControlBtn
            onClick={() => {
              toggleTracking();
            }}
          >
            <STYLE.TrackingControlBtnIconImage src={play_icon} alt="play" />
          </STYLE.TrackingControlBtn>
        ) : (
          <>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
              }}
            >
              <STYLE.TrackingControlBtnIconImage src={pause_icon} alt="pause" />
            </STYLE.TrackingControlBtn>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
                toggleIsModifying();
              }}
            >
              <STYLE.TrackingControlBtnIconImage src={stop_icon} alt="stop" />
            </STYLE.TrackingControlBtn>
          </>
        )}
      </STYLE.TrackingControlBtnContainer>

      <STYLE.TrackingToolContainer>
        <STYLE.TrackingToolBtn>
          <STYLE.TrackingToolBtnIConImage
            src={location_icon}
            alt="location"
            onClick={async () => {
              mapRef.current?.setCenter(await getCurrentLocation());
            }}
          />
        </STYLE.TrackingToolBtn>
        <STYLE.TrackingToolDiv
          onClick={() => {
            setTrackingData({ ...trackingData, background: MAPTYPE[0] });
          }}
        >
          기본
        </STYLE.TrackingToolDiv>
        <STYLE.TrackingToolDiv
          onClick={() => {
            setTrackingData({ ...trackingData, background: MAPTYPE[1] });
          }}
        >
          위성
        </STYLE.TrackingToolDiv>
      </STYLE.TrackingToolContainer>

      {/* 수정 모달 */}
      {isModifying && (
        <ModifyTrackingImageModal
          onClose={() => {
            toggleIsModifying();
          }}
          trackData={{ ...trackingData, line: trackingLine }}
        />
      )}
    </STYLE.TrackingPageContainer>
  );
};

export default Tracking;
