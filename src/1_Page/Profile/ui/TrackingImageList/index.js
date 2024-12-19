import React from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";

const Track = (props) => {
  const { data, checkSetMode } = props;
  return (
    <STYLE.TrackingContainer>
      {checkSetMode && <STYLE.TrackingCheckbox />}
      <Tracking data={data} height={"100%"} />
    </STYLE.TrackingContainer>
  );
};

export default Track;
