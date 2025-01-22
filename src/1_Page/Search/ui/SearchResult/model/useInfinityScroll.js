import { useState } from "react";

const useInfinityScroll = (activeTab) => {
  const [page, setPage] = useState({
    nickname: 1,
    searchpoint: 1,
  }); // 페이지 상태 초기화

  const handleNextPage = () => {
    setPage((prevPage) => ({
      ...prevPage,
      [activeTab]: prevPage[activeTab] + 1,
    }));
  };

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    // 스크롤이 가장 아래로 갔는지 확인
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      handleNextPage();
    }
  };

  return { page, handleScroll, handleNextPage }; // 페이지 상태와 스크롤 핸들러 반환
};

export default useInfinityScroll;
