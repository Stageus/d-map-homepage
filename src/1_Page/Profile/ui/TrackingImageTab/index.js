import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";
import TrackingImagePostListModal from "./ui/TrackingImagePostListModal";

const TrackingImageTab = (props) => {
  const {
    trackingImageList,
    modifyMode,
    handleScroll,
    handleAddModifyIdxList,
    hasMoreContent,
    handleNextPage,
  } = props;
  return (
    <>
      {trackingImageList.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid onScroll={handleScroll}>
          {trackingImageList.map((track) => {
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
      <TrackingImagePostListModal
        trackingImageList={trackingImageList}
        handleNextPage={handleNextPage}
        hasMoreContent={hasMoreContent}
      />
    </>
  );
};

export default TrackingImageTab;
