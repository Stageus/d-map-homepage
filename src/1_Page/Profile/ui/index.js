import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const {
    displayTrackingImage,
    setDisplayTrackingImage,
    modifyMode,
    setModifyIdxList,
    obServeRef,
  } = props;

  console.log("트래킹 이미지탭 렌더링");
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
