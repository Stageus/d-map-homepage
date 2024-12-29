// map 이 처음 load되었을 때 실행됨
export const handleMapLoad = (map, mapRef) => {
  mapRef.current = map;
};
