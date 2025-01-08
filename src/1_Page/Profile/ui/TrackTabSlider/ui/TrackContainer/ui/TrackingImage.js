import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";
import { useInView } from "react-intersection-observer";

const TrackingImage = (props) => {
  const {
    zoom = 15,
    center = { lat: 37.57, lng: 126.97 },
    line = [],
    lineColor = "#FF0000",
    lineWeight = 2,
    height = "400px",
    heading = 0,
    draggable = true,
  } = props.data;

  const { handleNextPage, index, isScroll } = props;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const [resetCount, setResetCount] = useState(0);

  const polylineOptions = {
    strokeColor: lineColor,
    strokeOpacity: 0.8,
    strokeWeight: lineWeight,
  };

  const onClearCanvas = () => {
    console.log("초기화 시작");
    const canvasElements = document.querySelectorAll("canvas");
    canvasElements.forEach((canvas) => {
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (context) {
        const loseExtension = context.getExtension("WEBGL_lose_context");
        if (loseExtension) {
          try {
            console.log("WebGL 초기화");
            loseExtension.loseContext();
          } catch (error) {
            console.log("WebGL 초기화 중 오류 발생:", error.message);
          }
        }
      }
    });
  };

  //   if (mapRef.current) {
  //     mapRef.current = null;
  //   }
  // };
  // const initialInViewRef = useRef(null);

  // useEffect(() => {
  //   if (isScroll) {
  //     // 스크롤 시작 시 `inView` 값을 기록
  //     initialInViewRef.current = inView;
  //     console.log("스크롤 시작:", initialInViewRef.current);
  //   } else if (!isScroll) {
  //     console.log("스크롤 끝:", inView, "초기값:", initialInViewRef.current);
  //     if (!initialInViewRef.current && inView) {
  //       setResetCount((prev) => prev + 1); // 리렌더링 트리거
  //     }
  //     onClearCanvas(); // WebGL 컨텍스트 해제
  //     isChangeRef.current = inView; // 현재 상태로 업데이트
  //   }
  // }, [isScroll]);
  // const onRemoveCanvas = () => {
  //   const canvasElements = document.querySelectorAll("canvas");
  //   canvasElements.forEach((canvas) => {
  //     canvas.parentElement?.removeChild(canvas);
  //   });
  // };

  useEffect(() => {
    if (inView) {
      onClearCanvas();
      setTimeout(() => {
        setResetCount((prev) => prev + 1);
      }, 200);
    }
  }, [inView, isScroll]);

  return (
    <STYLE.MapContainer>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <div
          ref={mapDivRef}
          style={{ position: "relative", width: "100%", height: height }}>
          <GoogleMap
            key={resetCount} // Trigger re-render by changing key
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            onLoad={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
            options={{
              zoom,
              center,
              heading,
              ...(!isScroll && { mapId: "90f87356969d889c" }),
              disableDefaultUI: true,
              draggable,
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              attributionControl: false,
            }}>
            {line.map((path, i) => (
              <Polyline key={i} path={path} options={polylineOptions} />
            ))}
          </GoogleMap>
        </div>
      </div>
    </STYLE.MapContainer>
  );
};

export default TrackingImage;
