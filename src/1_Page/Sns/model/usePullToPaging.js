import React from "react";

const usePullToPaging = (
  page,
  setPage,
  loading,
  hasMoreContent,
  scrollElemRef
) => {
  const [paging, setPaging] = React.useState(0); // 0: default, 1: next page, -1: prev page
  const startY = React.useRef();

  const handleTouchStart = React.useCallback((event) => {
    startY.current = event.touches[0].clientY;
  }, []);
  const handleTouchMove = React.useCallback(
    (event) => {
      const moveY = event.touches[0].clientY;
      const pullDistance = moveY - startY.current;
      const clientHeight = scrollElemRef.current.clientHeight;
      const scrollTop = scrollElemRef.current.scrollTop;
      const scrollHeight = scrollElemRef.current.scrollHeight;

      // 이전 page 이동
      if (pullDistance > 80 && scrollElemRef && scrollTop === 0 && page > 1) {
        setPaging(-1);
      }
      // 다음 page 이동
      if (
        pullDistance < -80 &&
        scrollElemRef &&
        clientHeight + scrollTop === scrollHeight
      ) {
        setPaging(1);
      }
    },
    [page, startY, scrollElemRef]
  );
  const handleTouchEnd = React.useCallback(() => {
    if (paging !== 0 && !loading && hasMoreContent) {
      if (paging === 1) {
        setPage((prev) => prev + 1);
      } else if (paging === -1) {
        setPage((prev) => prev - 1);
      }
      setPaging(0);
    }
  }, [paging, setPage, loading, hasMoreContent]);

  React.useEffect(() => {
    const scrollElement = scrollElemRef.current;
    scrollElement.addEventListener("touchstart", handleTouchStart);
    scrollElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    scrollElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      scrollElement.removeEventListener("touchstart", handleTouchStart);
      scrollElement.removeEventListener("touchmove", handleTouchMove);
      scrollElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, scrollElemRef]);

  return [paging];
};

export default usePullToPaging;
