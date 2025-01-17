import { useEffect, useRef } from "react";

const useObserver = (isLast, handleNextPage) => {
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (!isLast || !handleNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [isLast, handleNextPage]);

  return lastElementRef;
};

export default useObserver;
