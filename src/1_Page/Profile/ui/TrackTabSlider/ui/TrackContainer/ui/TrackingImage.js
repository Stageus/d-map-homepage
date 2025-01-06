import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { GoogleMap, Polyline } from "@react-google-maps/api";

const TrackingImage = (props) => {
  const { data, id } = props; // id를 props로 전달
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

  // WebGL 컨텍스트 초기화
  const cleanupMap = () => {
    const canvases = document.querySelectorAll("canvas");
    console.log(canvases.length);
    canvases.forEach((canvas) => {
      // canvas가 WebGL 컨텍스트를 가지고 있다면 초기화
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      // console.log(context);
      if (context) {
        // WebGL 컨텍스트 초기화
        context.getExtension("WEBGL_lose_context")?.loseContext();
      }
    });

    if (mapInstanceRef.current) {
      mapInstanceRef.current = null;
      const canvas = document.querySelector(`#canvas${id} canvas`);
      if (canvas) {
        console.log(canvas.getContext("webgl2"));
        const context =
          canvas.getContext("webgl") || canvas.getContext("webgl2");
        if (context) {
          context.getExtension("WEBGL_lose_context")?.loseContext();
        }
      }
    }
  };

  useEffect(() => {
    if (!inView) {
      cleanupMap(); // 뷰포트에서 벗어났을 때 정리
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      id={`canvas${id}`} // 특정 id 추가
      style={{ width: "100%", height: height }}>
      {inView && (
        <GoogleMap
          key="active"
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          onLoad={(map) => {
            mapInstanceRef.current = map; // Google Map 인스턴스 저장
          }}
          onUnmount={cleanupMap} // Map 제거 시 정리
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
