import STYLE from "./style";
import getCurrentLocation from "../../lib/getCurrentLocation";
import useTrackingToolModal from "./model/useTrackingToolModal";
import location_icon from "../../assets/location.svg";
import toggle_icon from "../../assets/toggle.svg";

const TrackingTools = (props) => {
  const { trackingData, setTrackingData, mapRef } = props;
  const [isTrackingToolModalOpen, toggleIsTrackingToolModalOpen] =
    useTrackingToolModal();
  return (
    <STYLE.TrackingToolContainer>
      {/* 현재 위치 이동 버튼 */}
      <STYLE.TrackingToolBtn>
        <STYLE.TrackingToolBtnIConImage
          src={location_icon}
          alt="location"
          onClick={async () => {
            mapRef.current?.setCenter(await getCurrentLocation());
          }}
        />
      </STYLE.TrackingToolBtn>
      {/* 일반 <-> 위성 지도 변경 버튼 */}
      <STYLE.TrackingToolModal $isOpen={isTrackingToolModalOpen}>
        <STYLE.TrackingToolDiv
          onClick={() => {
            setTrackingData({
              ...trackingData,
              background: 0,
              zoom: mapRef.current.getZoom(),
              center: mapRef.current.getCenter().toJSON(),
              heading: mapRef.current.getHeading(),
            });
          }}
          $isOpen={isTrackingToolModalOpen}
        >
          {isTrackingToolModalOpen && "기본"}
        </STYLE.TrackingToolDiv>
        <STYLE.TrackingToolDiv
          onClick={() => {
            setTrackingData({
              ...trackingData,
              background: 1,
              zoom: mapRef.current.getZoom(),
              center: mapRef.current.getCenter().toJSON(),
              heading: mapRef.current.getHeading(),
            });
          }}
          $isOpen={isTrackingToolModalOpen}
        >
          {isTrackingToolModalOpen && "위성"}
        </STYLE.TrackingToolDiv>
      </STYLE.TrackingToolModal>

      <STYLE.TrackingToolModalOpenBtn
        onClick={() => {
          toggleIsTrackingToolModalOpen();
        }}
      >
        <STYLE.TrackingToolModalOpenIconImage src={toggle_icon} />
      </STYLE.TrackingToolModalOpenBtn>
    </STYLE.TrackingToolContainer>
  );
};

export default TrackingTools;
