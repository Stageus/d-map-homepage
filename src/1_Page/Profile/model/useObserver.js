import { useEffect, useRef } from "react";

const useObserver = (handleNextPage) => {
  const lastSaveElementRef = useRef(null);
  const lastShareElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (lastSaveElementRef.current) {
      observer.observe(lastSaveElementRef.current);
    }
    if (lastShareElementRef.current) {
      observer.observe(lastShareElementRef.current);
    }

    return () => {
      if (lastSaveElementRef.current) {
        observer.unobserve(lastSaveElementRef.current);
      }
      if (lastShareElementRef.current) {
        observer.unobserve(lastShareElementRef.current);
      }
    };
  }, [handleNextPage]);

  return [lastSaveElementRef, lastShareElementRef];
};

export default useObserver;
