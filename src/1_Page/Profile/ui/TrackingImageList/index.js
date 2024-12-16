import React from "react";
import Tracking from "../../../../2_Widget/Profile_Tracking";
import STYLE from "./style";

const Track = (props) => {
  return (
    <STYLE.TrackingContainer>
      <Tracking data={props.data} />
    </STYLE.TrackingContainer>
  );
};

export default Track;
