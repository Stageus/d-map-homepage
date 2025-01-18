import STYLE from "./style";
import React from "react";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
import TrackingImagePost from "./ui/TrackingImagePost";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";
import CATEGORY from "./constant/category";
import usePage from "./model/usePage";

const Sns = () => {
  const snsPageContainerRef = React.useRef();
  const [category, setCategory] = React.useState(CATEGORY.DEFAULT);
  const [page, setPage] = usePage(category);
  const [trackingImageList, trackingImageListLoading, hasMoreContent] = useTrackingImageList(category, page);
  const [observeRef] = useInfiniteScrollPaging(setPage, trackingImageListLoading, hasMoreContent, snsPageContainerRef);

  return (
    <STYLE.SnsPageContainer ref={snsPageContainerRef}>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.SortingSelect onChange={(e)=>{setCategory(e.target.value);}}>
          <option value={CATEGORY.DEFAULT} key={CATEGORY.DEFAULT} >좋아요순</option>
          <option value={CATEGORY.RECENT} key={CATEGORY.RECENT}>최신순</option>
        </STYLE.SortingSelect>
      </STYLE.Header>
      <STYLE.TrackingList>
        {trackingImageList.map((elem, index) => {
          return (
            <STYLE.TrackingContainer key={index} ref={index === trackingImageList.length - 1 ? observeRef : null}>
              <TrackingImagePost data={{ ...elem, draggable: false }} />
            </STYLE.TrackingContainer>
          );
        })}
      </STYLE.TrackingList>
      
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
