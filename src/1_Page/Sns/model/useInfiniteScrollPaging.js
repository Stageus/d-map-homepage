import React from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScrollPaging = (page, setPage, loading, hasMoreContent) => {
  const { ref: nextPageRef, inView: nextPageInView } = useInView({
    threshold: 0,
  });
  const { ref: prevPageRef, inView: prevPageInView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (nextPageInView && !loading && hasMoreContent) {
      setPage((prev) => prev + 1);
      console.log("next page");
    }
  }, [nextPageInView, loading, hasMoreContent]);
  React.useEffect(() => {
    if (prevPageInView && !loading && page > 1) {
      setPage((prev) => prev - 1);
      console.log("prev page");
    }
  }, [prevPageInView, loading]);

  return [prevPageRef, nextPageRef];
};

export default useInfiniteScrollPaging;
