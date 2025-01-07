import STYLE from "./style";
import React from "react";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
import TrackingImagePost from "./ui/TrackingImagePost";
import { useParams } from "react-router-dom";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";

const Sns = () => {
  const [page, setPage] = React.useState(1);
  const { category, userIdx } = useParams();
  const [trackingImageList, trackingImageListLoading, hasMoreContent] =
    useTrackingImageList(category, userIdx, page);
  const [prevPagingRef, nextPagingRef] = useInfiniteScrollPaging(
    page,
    setPage,
    trackingImageListLoading,
    hasMoreContent
  );

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
              <TrackingImagePost
                data={{ ...elem, draggable: false }}
                observe={index === trackingImageList.length - 1
                  ? nextPagingRef // 마지막 요소
                  : undefined}
              />
            </STYLE.TrackingContainer>
          );
        })}
      </STYLE.TrackingList>
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
