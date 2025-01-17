import useThrottle from "../../../4_Shared/util/useThrottle";
import useTrackingDataAtom from "../../../4_Shared/Recoil/useTrackingDataAtom";

const useTrackingData = (mapRef) => {
  const [trackingData, setTrackingData] = useTrackingDataAtom();

  const throttledSetTrackingData = useThrottle(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter().toJSON();

      try {
        const newData = {
          idx: -1,
          zoom: mapRef.current?.getZoom(),
          center,
          heading: mapRef.current?.getHeading(),
          searchpoint: "temp",
          sharing: false,
          color: trackingData.color,
          thickness: trackingData.thickness,
          background: trackingData.background,
        };

        // 상태 업데이트
        if (JSON.stringify(newData) !== JSON.stringify(trackingData)) {
          setTrackingData(newData);
        }
      } catch (error) {
        console.error("searchpointConverter 실패:", error);
      }
    }
  }, 100);

  return [trackingData, throttledSetTrackingData];
};

export default useTrackingData;
