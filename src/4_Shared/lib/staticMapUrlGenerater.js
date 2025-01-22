const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const staticMapUrlGenerater = (mapInfo) => {
  const {
    zoom = 15,
    center = { lat: 37.57, lng: 126.97 },
    line = [],
    color = "FF0000", // Static Maps API에서는 색상에 #을 제거해야 함
    thickness = 2,
    background = 0,
    mapWidth = "300",
    mapHeight = "300",
  } = mapInfo;
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";

  // Polyline path (Static Maps API에서 polyline 형식으로 변환)
  const polylinePath = line
    .map((path) => path.map((point) => `${point.lat},${point.lng}`).join("|"))
    .join("|");

  // Static Map API 파라미터
  const params = new URLSearchParams({
    center: `${center.lat},${center.lng}`,
    zoom: zoom,
    size: `${mapWidth}x${mapHeight}`, // 이미지 사이즈
    maptype: background === 0 ? "roadmap" : "satellite", // MAPTYPE 대응
    path: `color:0x${color.replace(
      "#",
      ""
    )}FF|weight:${thickness}|${polylinePath}`,
    key: GOOGLE_MAP_API_KEY, // 여기에 API 키를 입력
  });

  return `${baseUrl}?${params.toString()}`;
};

export default staticMapUrlGenerater;
