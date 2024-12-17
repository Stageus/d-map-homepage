import React from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";

const Track = (props) => {
  return (
    <STYLE.TrackingContainer>
      <Tracking data={props.data} height={"100%"} />
    </STYLE.TrackingContainer>
  );
};

export default Track;
