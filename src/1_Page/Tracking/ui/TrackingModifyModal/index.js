import STYLE from "./style";
import React from "react";
import TrackingImage from "../../../../2_Widget/TrackingImage";
const TrackingModifyModal = (props) => {
  const { isModifying, trackingData, trackingLine } = props;
  return (
    <>
      <STYLE.TrackingSaveModal $isModifying={isModifying}>
        <TrackingImage data={{ ...trackingData, line: trackingLine }} />
      </STYLE.TrackingSaveModal>
    </>
  );
};

export default TrackingModifyModal;
