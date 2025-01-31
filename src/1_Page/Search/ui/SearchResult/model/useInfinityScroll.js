import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = () => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return [page, ref];
};

export default useInfinityScroll;
