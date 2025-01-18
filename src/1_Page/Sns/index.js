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
  const [
    defaultTrackingImageList,
    todayHotTrackingImageList,
    trackingImageListLoading,
    hasMoreContent,
  ] = useTrackingImageList(category, page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    trackingImageListLoading,
    hasMoreContent,
    snsPageContainerRef
  );

  return (
    <STYLE.SnsPageContainer ref={snsPageContainerRef}>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.SortingSelect
          onChange={(e) => {
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
      <STYLE.TrackingList>
        {category === CATEGORY.DEFAULT
          ? defaultTrackingImageList.map((elem, index) => {
              return (
                <STYLE.TrackingContainer
                  key={index}
                  ref={
                    index === defaultTrackingImageList.length - 1
                      ? observeRef
                      : null
                  }
                >
                  <TrackingImagePost data={{ ...elem, draggable: false }} />
                </STYLE.TrackingContainer>
              );
            })
          : category === CATEGORY.TODAYHOT &&
            todayHotTrackingImageList.map((elem, index) => {
              return (
                <STYLE.TrackingContainer
                  key={index}
                  ref={
                    index === defaultTrackingImageList.length - 1
                      ? observeRef
                      : null
                  }
                >
                  <TrackingImagePost data={{ ...elem, draggable: false }} />
                </STYLE.TrackingContainer>
              );
            })}
      </STYLE.TrackingList>
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
