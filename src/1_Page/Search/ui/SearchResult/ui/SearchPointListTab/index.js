import React from "react";
import STYLE from "./style";

import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";

const SearchPointListTab = (props) => {
  const { trackingImageList, hasMoreContent, observeRef } = props;

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
