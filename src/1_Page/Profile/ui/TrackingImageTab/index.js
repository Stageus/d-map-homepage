import React, { useEffect } from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = (props) => {
  const { trackingImageList, modifyMode, updateSelectedTracks, obServeRef } =
    props;

  useEffect(() => {
    console.log("트래킹 탭 렌더링");
  }, []);

  useEffect(() => {
    console.log(updateSelectedTracks);
  }, [updateSelectedTracks]);
  return (
    <>
      {trackingImageList.length === 0 ? (
        <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
      ) : (
        <STYLE.PostGrid>
          {trackingImageList.map((trackingImageData, index) => {
            return (
              <TrackContainer
                key={trackingImageData.idx}
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
