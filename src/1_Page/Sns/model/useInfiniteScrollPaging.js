import React from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScrollPaging = (setPage, loading, hasMoreContent) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  React.useEffect(() => {
    if (inView && !loading && hasMoreContent) {
      setPage((prev) => prev + 1);
      console.log("next page")
    }
  }, [inView, loading, hasMoreContent]);

  return [ref];
};

export default useInfiniteScrollPaging;
