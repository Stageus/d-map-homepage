import STYLE from "./style";
import React from "react";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
import TrackingImagePost from "./ui/TrackingImagePost";
import { useParams } from "react-router-dom";
import usePullToPaging from "./model/usePullToPaging";

const Sns = () => {
  const snsPageContainerRef = React.useRef();
  const [page, setPage] = React.useState(1);
  const { category, userIdx } = useParams();
  const [trackingImageList, trackingImageListLoading, hasMoreContent] =
    useTrackingImageList(category, userIdx, page);
  usePullToPaging(
    page,
    setPage,
    trackingImageListLoading,
    hasMoreContent,
    snsPageContainerRef
  );


  return (
    <STYLE.SnsPageContainer ref={snsPageContainerRef}>
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
              <TrackingImagePost data={{ ...elem, draggable: false }} />
            </STYLE.TrackingContainer>
          );
        })}
      </STYLE.TrackingList>
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
