import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import MAPTYPE from "../../4_Shared/constant/mapType";

const TrackingImage = (props) => {
  const { data } = props;
  const {
    zoom = 15,
    center = { lat: 37.57, lng: 126.97 },
    heading = 0,
    line = [],
    color = "#FF0000",
    thickness = 2,
    height = "400px",
    draggable = true,
    searchpoint = "서울시 종로구",
    sharing = false,
    idx = -1,
    background = 0,
  } = data;

  const polylineOptions = {
    strokeColor: color, // 빨간색 선
    strokeOpacity: 0.8,
    strokeWeight: thickness,
  };

  return (
    <>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: height,
          }}
          options={{
            zoom: zoom,
            center: center,
            heading: heading, // 지도 회전 각도 설정 (0 ~ 360)
            disableDefaultUI: true, // UI 요소 비활성화
            draggable, // 드래그 활성화/비활성화
            mapTypeId: MAPTYPE[background]
          }}>
          {/* 선 그리기 */}
          {line.map((elem, index) => {
            return <Polyline path={elem} options={polylineOptions} key={index} />;
          })}
        </GoogleMap>
    </>
  );
};

export default TrackingImage;
