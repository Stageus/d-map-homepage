import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  useJsApiLoader, // skeleton ui 만들고 나서 사용될 예정
} from "@react-google-maps/api";
import { handleMapLoad, handleMapIdle } from "./model/handleMapData";
import useIsTracking from "./model/useIsTracking";
import useIsModifying from "./model/useIsModifying";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";
import useTrackingDataAtom from "../../4_Shared/Recoil/useTrackingDataAtom";
import TrackingImage from "../../2_Widget/TrackingImage";
import play_icon from "./assets/play-solid.svg";
import pause_icon from "./assets/pause-solid.svg";
import stop_icon from "./assets/stop-solid.svg";
import useThrottle from "../../4_Shared/util/useThrottle";
import useTrackingSpot from "./model/useTrackingSpot";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Tracking = () => {
  // REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF //
  const mapRef = React.useRef(null); // google map instance
  const currentRecordingTrackingLineRef = React.useRef([]);
  const recordedTrackingLineRef = React.useRef([]);
  // REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF REF //

  // STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE //
  const [isTracking, toggleTracking] = useIsTracking();
  const [isModifying, toggleIsModifying] = useIsModifying();
  const [trackingData, setTrackingData] = useTrackingDataAtom(); // zoom / center / heading / line
  const [trackingSpot] = useTrackingSpot(
    isTracking,
    currentRecordingTrackingLineRef,
    recordedTrackingLineRef
  );
  // STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE STATE //

  // THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE //
  const throttledSetTrackingData = useThrottle(() => {
    setTrackingData({
      zoom: mapRef.current.getZoom(),
      center: mapRef.current.getCenter().toJSON(),
      heading: mapRef.current.getHeading(),
      line: isTracking ? recordedTrackingLineRef.current : trackingData.line,
    });
  }, 300);
  // THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE THROTTLE //

  // 기본 line 디자인
  const polylineOptions = {
    strokeColor: "#FF0000", // 빨간색 선
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };
  return (
    <STYLE.Main>
      {/* map instance */}
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          onLoad={(map) => {
            handleMapLoad(map, mapRef);
          }}
          onIdle={() => {
            console.log("render");
            if (mapRef.current) {
              throttledSetTrackingData();
            }
            console.log(trackingSpot);
          }}
          options={{
            disableDefaultUI: true,
            heading: trackingData.heading,
            zoom: trackingData.zoom,
            center: trackingData.center,
            mapId: "90f87356969d889c",
          }}>
          {/* 선 그리기 */}
          {trackingData.line.map((elem) => {
            return <Polyline path={elem} options={polylineOptions} />;
          })}
        </GoogleMap>
      </LoadScript>

      {/* Tracking Control Panel*/}
      <STYLE.TrackingControlBtnContainer>
        {!isTracking ? (
          <STYLE.TrackingControlBtn
            onClick={() => {
              toggleTracking();
            }}>
            <img src={play_icon} alt="play" />
          </STYLE.TrackingControlBtn>
        ) : (
          <>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
              }}>
              <img src={pause_icon} alt="pause" />
            </STYLE.TrackingControlBtn>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleIsModifying();
              }}>
              <img src={stop_icon} alt="stop" />
            </STYLE.TrackingControlBtn>
          </>
        )}
      </STYLE.TrackingControlBtnContainer>
      <STYLE.Filter
        isModifying={isModifying}
        onClick={() => {
          if (isModifying) {
            toggleIsModifying();
          }
        }}
      />
      <STYLE.TrackingSaveModal isModifying={isModifying}>
        <TrackingImage data={trackingData} />
      </STYLE.TrackingSaveModal>
    </STYLE.Main>
  );
};

export default Tracking;
