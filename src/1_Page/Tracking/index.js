import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  useJsApiLoader, // skeleton ui 만들고 나서 사용될 예정
} from "@react-google-maps/api";
import { handleMapLoad, handleMapIdle } from "./model/handleMapData";
import TrackingControlPanel from "./ui/TrackingControlPanel";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Tracking = () => {
  // google map instance
  const mapRef = React.useRef(null);
  // 현재 사용자가 조작하고있는 map instance의 zoom / center / heading Data
  const trackingDataRef = React.useRef({
    zoom: 15,
    center: { lat: 37.57, lng: 126.97 },
    heading: 120,
  });
  // 현재 사용자가 조작하고있는 map instance의 zoom / center / heading Data -> state로 관리
  const [trackingData, throttledSetTrackingData] = useTrackingData(trackingDataRef);
  // 사용자의 트래킹 스팟 set = line
  const [line, setLine] = React.useState([
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.5709, lng: 126.975 },
      { lat: 37.5719, lng: 126.9741 },
      { lat: 37.5724, lng: 126.969 },
      { lat: 37.5714, lng: 126.964 },
      { lat: 37.57, lng: 126.97 },
    ],
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.571, lng: 126.975 },
      { lat: 37.572, lng: 126.97 },
      { lat: 37.57, lng: 126.97 },
    ],
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.57, lng: 126.975 },
      { lat: 37.571, lng: 126.975 },
      { lat: 37.571, lng: 126.97 },
      { lat: 37.57, lng: 126.97 },
    ],
  ]);
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
            handleMapIdle(mapRef, trackingDataRef);
            throttledSetTrackingData({ ...trackingDataRef.current });
          }}
          options={{
            disableDefaultUI: true,
            heading: trackingDataRef.current.heading,
            zoom: trackingDataRef.current.zoom,
            center: trackingDataRef.current.center,
            mapId: "90f87356969d889c",
          }}
        >
          {/* 선 그리기 */}
          {line.map((elem) => {
            return <Polyline path={elem} options={polylineOptions} />;
          })}
        </GoogleMap>
      </LoadScript>

      {/* Tracking Control Panel*/}
      <TrackingControlPanel trackingData={trackingData} line={line} />
    </STYLE.Main>
  );
};

export default Tracking;
