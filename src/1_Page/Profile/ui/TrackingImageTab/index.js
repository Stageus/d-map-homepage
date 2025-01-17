import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const { sharingType, trackData, length, modifyMode, handle } = props;
  return length === 0 ? (
    <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
  ) : (
    <STYLE.PostGrid>
      {trackData?.map(
        (track) =>
          track.sharing === sharingType && (
            <TrackContainer
              track={track}
              modifyMode={modifyMode}
              handle={handle}
            />
          )
      )}
    </STYLE.PostGrid>
  );
};

export default TrackingImageTab;
