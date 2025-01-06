import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { GoogleMap, Polyline } from "@react-google-maps/api";

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
    draggable = true,
  } = data;

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const mapInstanceRef = useRef(null);

  const polylineOptions = {
    strokeColor: lineColor,
    strokeOpacity: 0.8,
    strokeWeight: lineWeight,
  };

  return (
    <div ref={ref} style={{ width: "100%", height: height }}>
      {inView && (
        <GoogleMap
          key={inView ? "active" : "inactive"} // 뷰포트 상태에 따라 컴포넌트 재생성
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          onLoad={(map) => {
            if (!mapInstanceRef.current) {
              mapInstanceRef.current = map; // Google Map 인스턴스 저장
            }
          }}
          options={{
            zoom: zoom,
            center: center,
            heading: heading,
            mapId: "90f87356969d889c",
            disableDefaultUI: true,
            draggable,
          }}>
          {/* 선 그리기 */}
          {line.map((elem, index) => (
            <Polyline key={index} path={elem} options={polylineOptions} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default TrackingImage;
