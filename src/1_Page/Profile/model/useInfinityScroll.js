import { useEffect, useState, useCallback, useRef } from "react";

const useInfinityScroll = (tabIndex) => {
  const [page, setPage] = useState({ save: 1, share: 1 });
  const pageRef = useRef(page);
  const currentKeyRef = useRef(tabIndex === 0 ? "share" : "save");

  // 최신 page 상태를 유지
  useEffect(() => {
    pageRef.current = page;
    console.log(page);
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

  const handleScroll = useCallback(
    (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollHeight - scrollTop - 1 <= clientHeight) {
        handleNextPage();
      }
    },
    [handleNextPage]
  );

  return { paging, handleScroll, checkLessLength };
};

export default useInfinityScroll;
