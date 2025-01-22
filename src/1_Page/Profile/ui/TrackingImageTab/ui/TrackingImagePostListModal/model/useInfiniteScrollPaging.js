import React from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScrollPaging = (handleNextPage, hasMoreContent) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasMoreContent) {
      handleNextPage();
    }
  }, [inView, hasMoreContent, handleNextPage]);

  return [ref];
};

export default useInfiniteScrollPaging;
