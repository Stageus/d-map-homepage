import React from "react";

const usePullToPaging = (
  page,
  setPage,
  loading,
  hasMoreContent,
  scrollElemRef
) => {
  const [startY, setStartY] = React.useState(0);
  const [paging, setPaging] = React.useState(0); // 0: default, 1: next page, -1: prev page
  const pageRef = React.useRef(page);

  React.useEffect(() => {
    // setTimeout 으로, paging을 비동기 방식으로 하기 때문에, 그냥 page를 사용하면 동기화가 똑바로 되지 않음
    pageRef.current = page;
  }, [page]);

  const handleTouchStart = React.useCallback((event) => {
    setStartY(event.touches[0].clientY);
  }, []);
  const handleTouchMove = React.useCallback(
    (event) => {
      const moveY = event.touches[0].clientY;
      const pullDistance = moveY - startY;
      const clientHeight = scrollElemRef.current.clientHeight;
      const scrollTop = scrollElemRef.current.scrollTop;
      const scrollHeight = scrollElemRef.current.scrollHeight;

      // 이전 page 이동
      if (pullDistance > 80 && scrollElemRef && scrollTop === 0 && page > 1) {
        scrollElemRef.current.style.transform = "translate(0, 40px)";
        scrollElemRef.current.style.transition = "0.3s";
        setPaging(-1);
      }

      // 다음 page 이동
      if (
        pullDistance < -80 &&
        scrollElemRef &&
        clientHeight + scrollTop === scrollHeight
      ) {
        scrollElemRef.current.style.transform = "translate(0, -40px)";
        scrollElemRef.current.style.transition = "0.3s";
        setPaging(1);
      }
    },
    [page, startY, scrollElemRef]
  );
  const handleTouchEnd = React.useCallback(() => {
    if (paging !== 0 && !loading && hasMoreContent) {
      setTimeout(() => {
        if (scrollElemRef?.current) {
          scrollElemRef.current.style.transform = "translate(0, 0)";
        }
        setPaging(false);
      }, 500);
      setTimeout(() => {
        if (paging === 1) {
          setPage(pageRef.current + 1);
        } else if (paging === -1) {
          setPage(pageRef.current - 1);
        }
      }, 1000);
    }
  }, [paging, scrollElemRef, setPage, loading, hasMoreContent]);

  React.useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return null;
};

export default usePullToPaging;
