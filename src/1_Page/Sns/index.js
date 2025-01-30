import STYLE from "./style";
import React from "react";
import useGetTrackingImageList from "../../3_Entity/SNS/useGetTrackingImageList";
import TrackingImagePostList from "../../2_Widget/TrackingImagePostList";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";
import CATEGORY from "./constant/category";
const Sns = () => {
  const snsPageContainerRef = React.useRef();
  const [category, setCategory] = React.useState(CATEGORY.DEFAULT);
  const [page, setPage] = React.useState(1);
  const [trackingImageList, trackingImageListLoading, hasMoreContent] =
    useGetTrackingImageList(category, page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    trackingImageListLoading,
    hasMoreContent,
    snsPageContainerRef
  );
  const currentDate = new Date();

  return (
    <STYLE.SnsPageContainer ref={snsPageContainerRef}>
      <STYLE.Header>
        <STYLE.Date>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
          {currentDate.getDate()}일
        </STYLE.Date>
        <STYLE.SortingSelect
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value={CATEGORY.DEFAULT} key={CATEGORY.DEFAULT}>
            최신순
          </option>
          <option value={CATEGORY.TODAYHOT} key={CATEGORY.TODAYHOT}>
            오늘의 인기순
          </option>
        </STYLE.SortingSelect>
      </STYLE.Header>
      <TrackingImagePostList
        trackingImageList={trackingImageList}
        observeRef={observeRef}
        hasMoreContent={hasMoreContent}
      />
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
