import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const { trackingImageList, modifyMode, updateSelectedTracks, obServeRef } =
    props;

  return (
    <>
      {trackingImageList.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid>
          {trackingImageList.map((trackingImageData, index) => {
            return (
              <TrackContainer
                obServeRef={
                  index === trackingImageList.length - 1 ? obServeRef : null
                }
                trackingImageData={trackingImageData}
                modifyMode={modifyMode}
                updateSelectedTracks={updateSelectedTracks}
              />
            );
          })}
        </STYLE.PostGrid>
      )}
    </>
  );
};

export default TrackingImageTab;
