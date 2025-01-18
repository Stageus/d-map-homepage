import React from "react";
import STYLE from "./style";
import TrackContainer from "./ui/TrackingImageContainer";

const TrackingImageTab = ({ trackData, modifyMode, handleScroll, handle }) => {
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
                handle={handle}
              />
            );
          })}
        </STYLE.PostGrid>
      )}
    </>
  );
};

export default TrackingImageTab;
