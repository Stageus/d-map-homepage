import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const {
    trackingImageList,
    modifyMode,
    handleScroll,
    handleAddModifyIdxList,
  } = props;

  return (
    <>
      {trackingImageList.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid onScroll={handleScroll}>
          {trackingImageList.map((trackingImageData) => {
            return (
              <TrackContainer
                trackingImageData={trackingImageData}
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
