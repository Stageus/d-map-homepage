import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  useJsApiLoader, // skeleton ui 만들고 나서 사용될 예정
} from "@react-google-maps/api";
import TrackingImage from "../../2_Widget/TrackingImage";
import STYLE from "./style";
import play_icon from "./assets/play-solid.svg";
import pause_icon from "./assets/pause-solid.svg";
import stop_icon from "./assets/stop-solid.svg";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Tracking = () => {
  // 사용자의 트래킹 시작 정보
  const [isTracking, setIsTracking] = React.useState(false);
  // 트래킹 편집 여부
  const [isModifying, setIsModifying] = React.useState(false);
  // google map instance
  const mapRef = React.useRef(null);
  // 사용자의 트래킹 스팟 set = line
  const [line, setLine] = React.useState([
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.5709, lng: 126.975 },
      { lat: 37.5719, lng: 126.9741 },
      { lat: 37.5724, lng: 126.969 },
      { lat: 37.5714, lng: 126.964 },
      { lat: 37.57, lng: 126.97 },
    ],
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.571, lng: 126.975 },
      { lat: 37.572, lng: 126.97 },
      { lat: 37.57, lng: 126.97 },
    ],
    [
      { lat: 37.57, lng: 126.97 },
      { lat: 37.57, lng: 126.975 },
      { lat: 37.571, lng: 126.975 },
      { lat: 37.571, lng: 126.97 },
      { lat: 37.57, lng: 126.97 },
    ],
  ]);
  // 현재 사용자가 조작하고있는 map instance의 zoom / center / heading Data
  const trackingDataRef = React.useRef({
    zoom: 15,
    center: { lat: 37.57, lng: 126.97 },
    heading: 120,
  });

  const setTrackingData = (zoom, center, heading) => {
    trackingDataRef.current = { zoom: zoom, center: center, heading: heading };
  };
  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };
  const stopTracking = () => {
    // setLine([]); <- 사용자 위치정보 담아서 서버로 넘기게 수정해야됨
    setIsModifying(!isModifying);
  };

  // 이부분 나중에 trakingImage 컴포넌트에서 props로 처리하게 수정해야됨
  const polylineOptions = {
    strokeColor: "#FF0000", // 빨간색 선
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  // map 이 처음 load되었을 때 실행됨
  const handleMapLoad = (map) => {
    mapRef.current = map;
    console.log(mapRef.current);
  };

  // 지도가 움직이지 않을 때 상태 trackingData를 갱신
  const handleMapIdle = () => {
    if (mapRef.current) {
      setTrackingData(
        mapRef.current.zoom,
        mapRef.current.getCenter().toJSON(), // 헤딩이 설정되지 않았으면 0 반환
        mapRef.current.heading
      );
      console.log(trackingDataRef.current);
    }
  };

  return (
    <STYLE.Main>
      {/* map instance */}
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          onLoad={handleMapLoad}
          onIdle={handleMapIdle}
          options={{
            disableDefaultUI: true,
            heading: trackingDataRef.current.heading,
            zoom: trackingDataRef.current.zoom,
            center: trackingDataRef.current.center,
            mapId: "90f87356969d889c",
          }}
        >
          {/* 선 그리기 */}
          {line.map((elem) => {
            return <Polyline path={elem} options={polylineOptions} />;
          })}
        </GoogleMap>
      </LoadScript>

      {/* 하단부 트래킹킹 시작/일시정지/정지 버튼튼 */}
      <STYLE.TrackingControlBtnContainer>
        {!isTracking ? (
          <STYLE.TrackingControlBtn
            src={play_icon}
            onClick={() => {
              toggleTracking();
            }}
          />
        ) : (
          <>
            <STYLE.TrackingControlBtn
              src={pause_icon}
              onClick={() => {
                toggleTracking();
              }}
            />
            <STYLE.TrackingControlBtn
              src={stop_icon}
              onClick={() => {
                stopTracking();
              }}
            />
          </>
        )}
      </STYLE.TrackingControlBtnContainer>

      {/* 트래킹 정지 버튼 클릭시 나타나는, tracking image 편집 모달 */}
      <STYLE.Filter isModifying={isModifying} onClick={()=>{
            if(isModifying){
              setIsModifying(false);
            }
          }}/>
      <STYLE.TrackingSaveModal isModifying={isModifying}>
        <TrackingImage data={{ ...trackingDataRef.current, line }} />
      </STYLE.TrackingSaveModal>
    </STYLE.Main>
  );
};

export default Tracking;
