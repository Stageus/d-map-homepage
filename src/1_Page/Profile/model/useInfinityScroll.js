import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = () => {
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);

  const handleNextPage = useCallback(() => {
    console.log("다음페이지");
    setPage((prev) => prev + 1);
  }, []);

  return [page, ref];
};

export default useInfinityScroll;
