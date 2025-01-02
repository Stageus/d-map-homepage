import STYLE from "./style";
import React from "react";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
import TrackingImagePost from "./ui/TrackingImagePost";
const Sns = () => {
  const [trackingImageList, trackingImageListLoading] = useTrackingImageList();
  return (
    <STYLE.SnsPageContainer>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.Sorting>
          <option value="good">좋아요순</option>
          <option value="recent">최신순</option>
        </STYLE.Sorting>
      </STYLE.Header>
      <STYLE.TrackingList>
        {trackingImageList.map((elem, index) => {
          return (
            <STYLE.TrackingContainer key={index}>
              <STYLE.PostInfo>
                <STYLE.PosterName>홍길동</STYLE.PosterName>
                <STYLE.PostUpdated>1달전</STYLE.PostUpdated>
              </STYLE.PostInfo>
              <TrackingImagePost data={{ ...elem, draggable: false }}/>
            </STYLE.TrackingContainer>
          );
        })}
      </STYLE.TrackingList>
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
