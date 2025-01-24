import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = (tabIndex) => {
  const [page, setPage] = useState({ save: 1, share: 1 });
  const pageRef = useRef(page);
  const currentKeyRef = useRef(tabIndex === 0 ? "share" : "save");
  const { ref: shareObserveRef, inView: searchPointInView } = useInView({
    threshold: 0,
  });
  const { ref: saveObserveRef, inView: nicknameInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    console.log(searchPointInView);
    if (searchPointInView || nicknameInView) {
      handleNextPage();
    }
  }, [searchPointInView, nicknameInView]);

  // 최신 page 상태를 유지
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  // 최신 currentKey 상태를 유지
  useEffect(() => {
    currentKeyRef.current = tabIndex === 0 ? "share" : "save";
  }, [tabIndex]);

  const paging = page[currentKeyRef.current];

  const handleNextPage = useCallback(() => {
    const currentKey = currentKeyRef.current;
    const currentPage = pageRef.current[currentKey];
    setPage((prev) => ({
      ...prev,
      [currentKey]: currentPage + 1,
    }));
  }, []);

  const checkLessLength = useCallback(
    (length) => {
      if (length <= 9) {
        handleNextPage();
      }
    },
    [handleNextPage]
  );

  return { paging, checkLessLength, shareObserveRef, saveObserveRef };
};

export default useInfinityScroll;
