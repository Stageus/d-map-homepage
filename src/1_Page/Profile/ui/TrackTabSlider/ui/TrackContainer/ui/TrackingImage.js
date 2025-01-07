import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";

const TrackingImage = (props) => {
  const { data, inView, index } = props; // inView를 props로 전달받음
  const { resetState, setResetState } = props;
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

  const mapInstanceRef = useRef(null);
  const [mapKey, setMapKey] = useState(0); // React key를 통한 강제 재생성 관리

  const polylineOptions = {
    strokeColor: lineColor,
    strokeOpacity: 0.8,
    strokeWeight: lineWeight,
  };

  // 맵 초기화 함수
  const resetMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null; // 기존 인스턴스 무효화
    }
    setMapKey((prevKey) => prevKey + 1); // React key 변경으로 맵 컴포넌트 재생성
  };

  const handleMapLoad = (map) => {
    mapInstanceRef.current = map;
  };

  const handleMapUnmount = () => {
    mapInstanceRef.current = null; // Google Map 인스턴스 해제
  };

  useEffect(() => {
    let timer;
    if (inView && resetState) {
      setResetState(false);
      timer = setTimeout(() => {
        resetMap();
      }, 100);
    }
    return () => {
      if (timer) {
        clearTimeout(timer); // 타이머 정리
      }
    };
  }, [inView, resetState]);

  return (
    <div style={{ position: "relative", width: "100%", height: height }}>
      <button
        onClick={resetMap}
        style={{ position: "absolute", zIndex: 1, top: 10, right: 10 }}>
        Reset Map
      </button>
      <GoogleMap
        key={mapKey} // React key 변경 시 Google Map 재생성
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
        options={{
          zoom: zoom,
          center: center,
          heading: heading,
          mapId: "90f87356969d889c",
          disableDefaultUI: true,
          draggable,
        }}>
        {line.map((elem, index) => (
          <Polyline key={index} path={elem} options={polylineOptions} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default TrackingImage;
