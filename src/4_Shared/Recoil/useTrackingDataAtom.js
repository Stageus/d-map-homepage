import { atom, useRecoilValue, useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const trackingDataAtom = atom({
  key: "TRACKINGDATA_ATOM",
  default: {
    idx: -1,
    zoom: 10,
    center: { lat: 37.57, lng: 126.97 },
    heading: 0,
    background: 0,
    searchpoint: "서울시 종로구",
    sharing: false,
    color: "#FF0000",
    thickness: 2,
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
