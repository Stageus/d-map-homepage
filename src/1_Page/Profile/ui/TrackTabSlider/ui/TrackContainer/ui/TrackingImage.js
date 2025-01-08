import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import STYLE from "./style";

import { useInView } from "react-intersection-observer";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

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

  const { handleNextPage } = props;

  const { isScroll, index } = props;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const mapRef = useRef(null); // Google Map 인스턴스를 참조
  const [resetCount, setResetCount] = useState(0); // 맵 리셋 카운터

  const polylineOptions = {
    strokeColor: lineColor,
    strokeOpacity: 0.8,
    strokeWeight: lineWeight,
  };

  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (handleNextPage && inView) handleNextPage();
  }, [inView]);
  useEffect(() => {
    const size = `${600}x${400}`;
    const centerParam = `${center.lat},${center.lng}`;
    const pathParams = line
      .map(
        (path) => path.map((point) => `${point.lat},${point.lng}`).join("|") // 라인 내 각 좌표를 연결
      )
      .map(
        (path) =>
          `&path=color:${`0x${lineColor.substring(1)}`}|weight:${
            lineWeight * 5
          }|${path}` // 각 라인의 색상, 두께, 좌표 설정
      )
      .join(""); // 여러 라인을 처리
    const adjustZoom = (zoom) => {
      const vectorToStaticFactor = 0.8; // 벡터 -> 스태틱 보정 값
      return zoom * vectorToStaticFactor;
    };
    // 스타일 설정
    const styles = [
      "feature:landscape|element:geometry|color:0xf5f5f5", // 도로 외 배경을 회색으로 설정
      "feature:water|element:geometry|color:0xe0e0e0", // 물을 연회색으로 설정
      "feature:poi.park|element:geometry|color:0xf5f5f5", // 공원(녹지)을 회색으로 설정
      "feature:all|element:labels|visibility:off", // 모든 레이블 숨기기
    ]
      .map((style) => `&style=${style}`)
      .join("");
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${centerParam}&zoom=${adjustZoom(
      zoom
    )}&size=${size}${pathParams}${styles}&key=${API_KEY}`;
    setMapUrl(url);
  }, [zoom, center, line, lineColor, lineWeight]);

  return (
    <STYLE.MapContainer>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: height }}>
          {inView ? (
            <GoogleMap
              key={resetCount} // resetCount 변경 시 맵 재생성
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              onLoad={(mapInstance) => {
                mapRef.current = mapInstance; // Google Map 인스턴스를 참조
              }}
              options={{
                zoom,
                center,
                heading,
                mapId: "90f87356969d889c",
                disableDefaultUI: true, // 기본 UI 비활성화
                draggable,
                zoomControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                attributionControl: false, // 지도 데이터와 약관 비활성화
              }}>
              {line.map((path, i) => (
                <Polyline key={i} path={path} options={polylineOptions} />
              ))}
            </GoogleMap>
          ) : (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                src={mapUrl}
                alt="Tracking Map"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // 이미지 크기 맞추기
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  opacity: "10%",
                }}></div>
            </div>
          )}
        </div>
      </div>
    </STYLE.MapContainer>
  );
};

export default TrackingImage;
