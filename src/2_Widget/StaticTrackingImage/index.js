import React from "react";
import STYLE from "./style";
import useStaticMapSize from "./model/useStaticMapSize";
import staticMapUrlGenerater from "../../4_Shared/lib/staticMapUrlGenerater";

const StaticTrackingImage = React.memo((props) => {
  const { mapInfo, height } = props;
  const mapWrapperRef = React.useRef();
  const [mapWidth, mapHeight] = useStaticMapSize(mapWrapperRef);
  const staticMapUrl = staticMapUrlGenerater({
    ...mapInfo,
    mapWidth,
    mapHeight,
  });

  return (
    <STYLE.StaticMapWrapper ref={mapWrapperRef} $height={height}>
      <STYLE.StaticMapImage src={staticMapUrl} alt="Tracking Map" />
    </STYLE.StaticMapWrapper>
  );
});

export default StaticTrackingImage;
