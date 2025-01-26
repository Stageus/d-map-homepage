import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = (tabIndex) => {
  const [page, setPage] = useState({ save: 1, share: 1 });

  const getCurrentKey = () => (tabIndex === 0 ? "share" : "save");

  const { ref: shareObserveRef, inView: searchPointInView } = useInView({
    threshold: 0,
  });
  const { ref: saveObserveRef, inView: nicknameInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (searchPointInView || nicknameInView) {
      handleNextPage();
    }
  }, [searchPointInView, nicknameInView]);

  const handleNextPage = useCallback(() => {
    setPage((prev) => ({
      ...prev,
      [getCurrentKey()]: prev[getCurrentKey()] + 1,
    }));
  }, [tabIndex]);

  const checkLessLength = useCallback(
    (length) => {
      if (length <= 9) {
        handleNextPage();
      }
    },
    [handleNextPage]
  );

  return [page[getCurrentKey()], shareObserveRef, saveObserveRef];
};

export default useInfinityScroll;
