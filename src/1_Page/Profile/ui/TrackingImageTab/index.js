import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const { trackData, modifyMode, handleScroll, handleAddModifyIdxList } = props;
  return (
    <>
      {trackData.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid onScroll={handleScroll}>
          {trackData.map((track) => {
            return (
              <TrackContainer
                key={track.id}
                track={track}
                modifyMode={modifyMode}
                handleAddModifyIdxList={handleAddModifyIdxList}
              />
            );
          })}
        </STYLE.PostGrid>
      )}
    </>
  );
};

export default TrackingImageTab;
