import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const {
    displayTrackingImage,
    modifyMode,
    setDisplayTrackingImage,
    setModifyIdxList,
    obServeRef,
  } = props;

  return (
    <>
      {displayTrackingImage.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid>
          {displayTrackingImage.map((trackingImageData, index) => {
            return (
              <TrackContainer
                key={trackingImageData.idx}
                obServeRef={
                  index === displayTrackingImage.length - 1 ? obServeRef : null
                }
                trackingImageData={trackingImageData}
                modifyMode={modifyMode}
                setDisplayTrackingImage={setDisplayTrackingImage}
                setModifyIdxList={setModifyIdxList}
              />
            );
          })}
        </STYLE.PostGrid>
      )}
    </>
  );
};

export default TrackingImageTab;
