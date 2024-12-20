import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


const TrackingImage = (props) => {
  const { data } = props;
  const {
    zoom = 15,
    center = { lat: 37.57, lng: 126.97 },
    heading = 0,
    line = [],
    lineColor = "#FF0000",
    lineWeight = 2,
    height = "400px",
  } = data;

  const polylineOptions = {
    strokeColor: lineColor, // 빨간색 선
    strokeOpacity: 0.8,
    strokeWeight: lineWeight,
  };

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: height,
          }}
          options={{
            zoom: zoom,
            center: center,
            heading: heading, // 지도 회전 각도 설정 (0 ~ 360)
            mapId: "90f87356969d889c",
            disableDefaultUI: true, // UI 요소 비활성화
          }}>
          {/* 선 그리기 */}
          {line.map((elem) => {
            return <Polyline path={elem} options={polylineOptions} />;
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default TrackingImage;
