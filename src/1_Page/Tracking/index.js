import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import STYLE from "./style";
import useTrackingData from "./model/useTrackingData";
import MAPTYPE from "../../4_Shared/constant/mapType";
import TrackingLineController from "./ui/TrackingLineController";
import TrackingController from "./ui/TrackingController";
import TrackingTools from "./ui/TrackingTools";

const Tracking = () => {
  const mapRef = React.useRef(null); // google map instance
  const [trackingData, setTrackingData] = useTrackingData(); // zoom / center / heading

  return (
    <STYLE.TrackingPageContainer>
      {/* map instance */}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          disableDefaultUI: true,
          heading: trackingData.heading,
          zoom: trackingData.zoom,
          center: trackingData.center,
          mapTypeId: MAPTYPE[trackingData.background],
        }}
      >
        {/* Tracking Line*/}
        <TrackingLineController
          color={trackingData.color}
          thickness={trackingData.thickness}
        />
      </GoogleMap>
      {/* 현위치 버튼 & 지도 모드 변경 버튼 & line reset/undo 버튼  */}
      <TrackingTools
        trackingData={trackingData}
        setTrackingData={setTrackingData}
        mapRef={mapRef}
      />
      {/* Tracking 시작/정지 버튼 & 수정/저장 모달 */}
      <TrackingController
        trackingData={trackingData}
        setTrackingData={setTrackingData}
        mapRef={mapRef}
      />
    </STYLE.TrackingPageContainer>
  );
};

export default Tracking;
