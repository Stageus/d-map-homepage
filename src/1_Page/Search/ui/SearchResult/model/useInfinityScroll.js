import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useInfinityScroll = (activeTab) => {
  const [page, setPage] = useState({
    nickname: 1,
    searchpoint: 1,
  });
  const { ref: searchPointObserveRef, inView: searchPointInView } = useInView({
    threshold: 0,
  });
  const { ref: nicknameObserveRef, inView: nicknameInView } = useInView({
    threshold: 0,
  });
  const { ref: searchPointModalObserveRef, inView: anotherInView } = useInView({
    threshold: 0,
  });

  // 현재 탭의 다음 페이지 불러오기
  const handleNextPage = () => {
    setPage((prevPage) => ({
      ...prevPage,
      [activeTab]: prevPage[activeTab] + 1,
    }));
  };

  useEffect(() => {
    if (searchPointInView || nicknameInView || anotherInView) {
      handleNextPage();
    }
  }, [searchPointInView, nicknameInView, anotherInView]);

  return {
    page,
    searchPointObserveRef,
    nicknameObserveRef,
    searchPointModalObserveRef,
  }; // 페이지 상태와 스크롤 핸들러 반환
};

export default useInfinityScroll;
