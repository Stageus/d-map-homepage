import React, { useEffect } from "react";
import STYLE from "./style";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";

const SearchPointListTab = (props) => {
  const { trackingImageList, hasMoreContent, observeRef } = props;
  console.log("렌더");
  useEffect(() => {
    console.log(trackingImageList);
  }, [trackingImageList]);

  return (
    <STYLE.TrackingBox>
      <TrackingImagePostList
        trackingImageList={trackingImageList}
        hasMoreContent={hasMoreContent}
        observeRef={observeRef}
      />
    </STYLE.TrackingBox>
  );
};
export default React.memo(SearchPointListTab);
