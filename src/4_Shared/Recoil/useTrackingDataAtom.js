import { atom, useRecoilValue, useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const trackingDataAtom = atom({
  key: "TRACKINGDATA_ATOM",
  default: {
    zoom: 10,
    center: { lat: 37.57, lng: 126.97 },
    heading: 0,
  },
});

const useTrackingDataAtom = () => {
  const trackingData = useRecoilValue(trackingDataAtom);
  const setTrackingData = useSetRecoilState(trackingDataAtom);

  const setTrackingDataEvent = (value) => {
    setTrackingData(value);
  };

  return [trackingData, setTrackingDataEvent];
};
export default useTrackingDataAtom;
