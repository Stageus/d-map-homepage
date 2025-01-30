import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = () => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { ref: modalRef, inView: modalInview } = useInView({
    threshold: 0,
  });

  // 현재 탭의 다음 페이지 불러오기
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (inView || modalInview) {
      handleNextPage();
    }
  }, [ref, modalRef]);

  return [page, ref, modalRef];
};

export default useInfinityScroll;
