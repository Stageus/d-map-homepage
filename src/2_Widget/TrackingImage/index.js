import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Tracking = (props) => {
  const { data, height = "400px" } = props;
  const { lineWidth = 2, lineColor = "#FF0000" } = props;
  const { zoom, center, line } = data;

  const polylineOptions = {
    strokeColor: lineColor, // 빨간색 선
    strokeOpacity: 0.8,
    strokeWeight: lineWidth,
  };

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height,
          }}
          center={center}
          zoom={zoom}
          options={{
            heading: 150, // 지도 회전 각도 설정 (0 ~ 360)
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

export default Tracking;
