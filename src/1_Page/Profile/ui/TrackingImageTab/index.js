import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";
import TrackingImagePostListModal from "./ui/TrackingImagePostListModal";
import useModalHandler from "../../../../4_Shared/model/useModalHandler";

const TrackingImageTab = (props) => {
  const {
    trackingImageList,
    modifyMode,
    handleScroll,
    handleAddModifyIdxList,
    hasMoreContent,
    handleNextPage,
  } = props;

  const [isTrackingPost, handleTrackingPost] = useModalHandler();

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
                handleTrackingPost={handleTrackingPost}
              />
            );
          })}
        </STYLE.PostGrid>
      )}
      {isTrackingPost && (
        <TrackingImagePostListModal
          trackingImageList={trackingImageList}
          handleNextPage={handleNextPage}
          hasMoreContent={hasMoreContent}
          onClose={handleTrackingPost}
        />
      )}
    </>
  );
};

export default TrackingImageTab;
