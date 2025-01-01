import STYLE from "./style";
import React from "react";
import TrackingImage from "../../2_Widget/TrackingImage";
import TrackingImageActions from "./ui/TrackingImageActions";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
const Sns = () => {
  const [trackingImageList, trackingImageListLoading] = useTrackingImageList();
  
  return (
    <STYLE.SnsPageWrapper>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.Sorting>
          <option value="good">좋아요순</option>
          <option value="recent">최신순</option>
        </STYLE.Sorting>
      </STYLE.Header>
      <STYLE.TrackingList>
        {trackingImageList.map((elem, index) => {
          console.log(elem.line)
          return (
            <STYLE.TrackingContainer key={index}>
              <STYLE.PostInfo>
                <STYLE.PosterName>홍길동</STYLE.PosterName>
                <STYLE.PostUpdated>1달전</STYLE.PostUpdated>
              </STYLE.PostInfo>
                <TrackingImage data={{ ...elem, draggable: false }} />
              <TrackingImageActions data={elem} />
            </STYLE.TrackingContainer>
          );
        })}
      </STYLE.TrackingList>
    </STYLE.SnsPageWrapper>
  );
};

export default Sns;
