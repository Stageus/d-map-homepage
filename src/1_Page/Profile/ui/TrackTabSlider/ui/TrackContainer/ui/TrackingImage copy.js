import React, { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const TrackingImage = (props) => {
  const { data } = props;
  const {
    zoom = 15,
    center = { lat: 37.57, lng: 126.97 },
    line = [],
    lineColor = "0xFF0000",
    lineWeight = 2,
    width = 600,
  } = data;

  const height = 400;

  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const size = `${width}x${height}`;
    const centerParam = `${center.lat},${center.lng}`;
    const pathParams = line
      .map(
        (path) => path.map((point) => `${point.lat},${point.lng}`).join("|") // 라인 내 각 좌표를 연결
      )
      .map(
        (path) => `&path=color:${lineColor}|weight:${lineWeight * 3}|${path}` // 각 라인의 색상, 두께, 좌표 설정
      )
      .join(""); // 여러 라인을 처리

    // 스타일 설정
    const styles = [
      "feature:landscape|element:geometry|color:0xf5f5f5", // 도로 외 배경을 회색으로 설정
      "feature:water|element:geometry|color:0xe0e0e0", // 물을 연회색으로 설정
      "feature:poi.park|element:geometry|color:0xf5f5f5", // 공원(녹지)을 회색으로 설정
      "feature:all|element:labels|visibility:off", // 모든 레이블 숨기기
    ]
      .map((style) => `&style=${style}`)
      .join("");

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${centerParam}&zoom=${zoom}&size=${size}${pathParams}${styles}&key=${API_KEY}`;
    setMapUrl(url);
  }, [zoom, center, line, lineColor, lineWeight, width, height]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {mapUrl && (
        <img
          src={mapUrl}
          alt="Tracking Map"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};

export default TrackingImage;
