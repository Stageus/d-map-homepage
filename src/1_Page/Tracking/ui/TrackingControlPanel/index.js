import React from "react";
import STYLE from "./style";
import play_icon from "../../assets/play-solid.svg";
import pause_icon from "../../assets/pause-solid.svg";
import stop_icon from "../../assets/stop-solid.svg";
import useIsTracking from "./model/useIsTracking";
import useIsModfying from "./model/useIsModifying";
import TrackingImage from "../../../../2_Widget/TrackingImage";

const TrackingControlPanel = (props) => {
  const { trackingData, line } = props;
  const [isTracking, toggleTracking] = useIsTracking();
  const [isModifying, toggleIsModifying] = useIsModfying();

  return (
    <>
      <STYLE.TrackingControlBtnContainer>
        {!isTracking ? (
          <STYLE.TrackingControlBtn
            onClick={() => {
              toggleTracking();
            }}
          ><img src={play_icon} alt="play"/></STYLE.TrackingControlBtn>
        ) : (
          <>
            <STYLE.TrackingControlBtn
            onClick={() => {
              toggleTracking();
            }}
          ><img src={pause_icon} alt="pause"/></STYLE.TrackingControlBtn>
            <STYLE.TrackingControlBtn
            onClick={() => {
              toggleIsModifying();
            }}
          ><img src={stop_icon} alt="stop"/></STYLE.TrackingControlBtn>
          </>
        )}
      </STYLE.TrackingControlBtnContainer>
      <STYLE.Filter
        isModifying={isModifying}
        onClick={() => {
          if (isModifying) {
            toggleIsModifying();
          }
        }}
      />
      <STYLE.TrackingSaveModal isModifying={isModifying}>
        <TrackingImage data={{ ...trackingData, line }} />
      </STYLE.TrackingSaveModal>
    </>
  );
};

export default TrackingControlPanel;
