import { useEffect, useRef, useCallback } from "react";

const useObserver = (handleNextPage) => {
  const scrollContainerShareRef = useRef(null);
  const scrollContainerSaveRef = useRef(null);

  const handleScroll = useCallback((event) => {
    const container = event.target;
    const isBottom =
      container.scrollHeight - container.scrollTop - 1 <=
      container.clientHeight;

    if (isBottom) {
      handleNextPage();
    }
  }, []);
  // useEffect(() => {
  //   const shareContainer = scrollContainerShareRef.current;
  //   const saveContainer = scrollContainerSaveRef.current;

  //   const handleShareScroll = () => handleScroll(shareContainer);
  //   const handleSaveScroll = () => handleScroll(saveContainer);

  //   // 안전한 null 체크
  //   if (shareContainer) {
  //     shareContainer.addEventListener("scroll", handleShareScroll);
  //   }
  //   if (saveContainer) {
  //     saveContainer.addEventListener("scroll", handleSaveScroll);
  //   }

  //   return () => {
  //     if (shareContainer) {
  //       shareContainer.removeEventListener("scroll", handleShareScroll);
  //     }
  //     if (saveContainer) {
  //       saveContainer.removeEventListener("scroll", handleSaveScroll);
  //     }
  //   };
  // }, [handleNextPage]);

  return handleScroll;
};

export default useObserver;
