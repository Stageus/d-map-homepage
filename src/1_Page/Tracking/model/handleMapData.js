// map 이 처음 load되었을 때 실행됨
export const handleMapLoad = (map, mapRef) => {
  mapRef.current = map;
  console.log(mapRef.current);
};

// 지도가 움직이지 않을 때 상태 trackingData를 갱신
export const handleMapIdle = (mapRef, trackingDataRef) => {
  if (mapRef.current) {
    trackingDataRef.current = {
      zoom: mapRef.current.zoom,
      center: mapRef.current.getCenter().toJSON(),
      heading: mapRef.current.heading,
    };
  }
};
