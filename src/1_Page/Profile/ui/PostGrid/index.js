import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackContainer";

const PostGrid = (props) => {
  const { sharingType, trackData, getTrackLength, modifyMode, handle } = props;
  return getTrackLength(sharingType) === 0 ? (
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

export default PostGrid;
