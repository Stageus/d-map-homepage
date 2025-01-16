import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";
import play_icon from "./assets/play-solid.svg";
import pause_icon from "./assets/pause-solid.svg";
import stop_icon from "./assets/stop-solid.svg";
import useTrackingLine from "./model/useTrackingLine";
import polylineOptions from "./constant/polylineOptions";
import useIsTrackingAtom from "../../4_Shared/Recoil/useIsTrackingAtom";
import useIsModifyingTrackingAtom from "../../4_Shared/Recoil/useIsModifyingTrackingAtom";
import TrackingModifyModal from "./ui/TrackingModifyModal";
import TrackingImage from "../../2_Widget/TrackingImage";
import Modal from "../../2_Widget/Modal";
const Tracking = () => {
  const mapRef = React.useRef(null); // google map instance
  const isInteractingMap = React.useRef(false);
  const [isTracking, toggleTracking] = useIsTrackingAtom();
  const [isModifying, toggleIsModifying] = useIsModifyingTrackingAtom();
  const [trackingData, throttledSetTrackingData] = useTrackingData(mapRef); // zoom / center / heading
  const [trackingLine, resetTrackingLine] = useTrackingLine(
    isTracking,
    isInteractingMap
  );
  console.log({ ...trackingData, line: trackingLine })
  return (
    <STYLE.Main>
      {/* map instance */}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onIdle={async () => {
          await throttledSetTrackingData();
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
          mapId: "90f87356969d889c",
        }}
      >
        {/* 선 그리기 */}
        {trackingLine.map((elem) => {
          return <Polyline path={elem} options={polylineOptions} />;
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
            <img src={play_icon} alt="play" />
          </STYLE.TrackingControlBtn>
        ) : (
          <>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
              }}
            >
              <img src={pause_icon} alt="pause" />
            </STYLE.TrackingControlBtn>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
                toggleIsModifying();
              }}
            >
              <img src={stop_icon} alt="stop" />
            </STYLE.TrackingControlBtn>
          </>
        )}
      </STYLE.TrackingControlBtnContainer>

      {/* 수정 모달 */}
      {isModifying && (
        <Modal
          onClose={() => {
            toggleIsModifying();
          }}
          trackData={{ ...trackingData, line: trackingLine }}
        />
      )}
    </STYLE.Main>
  );
};

export default Tracking;
