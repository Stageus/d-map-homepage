import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
} from "@react-google-maps/api";
import useIsTracking from "./model/useIsTracking";
import useIsModifying from "./model/useIsModifying";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";
import TrackingImage from "../../2_Widget/TrackingImage";
import play_icon from "./assets/play-solid.svg";
import pause_icon from "./assets/pause-solid.svg";
import stop_icon from "./assets/stop-solid.svg";
import useTrackingLine from "./model/useTrackingLine";
import polylineOptions from "./constant/polylineOptions";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Tracking = () => {
  const mapRef = React.useRef(null); // google map instance
  const [isTracking, toggleTracking] = useIsTracking();
  const [isModifying, toggleIsModifying] = useIsModifying();
  const [trackingData, throttledSetTrackingData] = useTrackingData(mapRef); // zoom / center / heading
  const [trackingLine, resetTrackingLine] = useTrackingLine(isTracking);
  
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
            mapRef.current = map;
          }}
          onIdle={() => {
            console.log("render");
            throttledSetTrackingData();
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
      </LoadScript>

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
                toggleIsModifying();
              }}
            >
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
