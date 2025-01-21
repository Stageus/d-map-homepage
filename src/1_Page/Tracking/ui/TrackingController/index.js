import useIsTrackingAtom from "../../../../4_Shared/Recoil/useIsTrackingAtom";
import useIsModifyingTrackingAtom from "../../../../4_Shared/Recoil/useIsModifyingTrackingAtom";
import ModifyTrackingImageModal from "../../../../2_Widget/ModifyTrackingImageModal";
import play_icon from "../../assets/play.svg";
import pause_icon from "../../assets/pause.svg";
import stop_icon from "../../assets/stop.svg";
import STYLE from "./style";

const TrackingController = (props) => {
  const { trackingData, setTrackingData, mapRef } = props;
  const [isTracking, toggleTracking] = useIsTrackingAtom();
  const [isModifying, toggleIsModifying] = useIsModifyingTrackingAtom();

  return (
    <>
      {/* Tracking Control Panel*/}
      <STYLE.TrackingControlBtnContainer>
        {!isTracking ? (
          <STYLE.TrackingControlBtn
            onClick={() => {
              toggleTracking();
            }}
          >
            <STYLE.TrackingControlBtnIconImage src={play_icon} alt="play" />
          </STYLE.TrackingControlBtn>
        ) : (
          <>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
              }}
            >
              <STYLE.TrackingControlBtnIconImage src={pause_icon} alt="pause" />
            </STYLE.TrackingControlBtn>
            <STYLE.TrackingControlBtn
              onClick={() => {
                toggleTracking();
                toggleIsModifying();
              }}
            >
              <STYLE.TrackingControlBtnIconImage
                src={stop_icon}
                alt="stop"
                onClick={() => {
                  if (mapRef.current) {
                    try {
                      // 상태 업데이트
                      setTrackingData({
                        idx: -1,
                        zoom: mapRef.current.getZoom(),
                        center: mapRef.current.getCenter().toJSON(),
                        heading: mapRef.current.getHeading(),
                        searchpoint: "temp",
                        sharing: false,
                        color: trackingData.color,
                        thickness: trackingData.thickness,
                        background: trackingData.background,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              />
            </STYLE.TrackingControlBtn>
          </>
        )}
      </STYLE.TrackingControlBtnContainer>

      {isModifying && (
        <ModifyTrackingImageModal
          onClose={() => {
            toggleIsModifying();
          }}
          trackData={trackingData}
        />
      )}
    </>
  );
};

export default TrackingController;
