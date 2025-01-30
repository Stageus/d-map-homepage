import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNavigateHandler = (
  reset,
  searchInputText,
  addSearchHistory,
  setIsFisrtSearch,
  setIsSearchFocus
) => {
  const navigate = useNavigate();

  // 검색 수행 함수 (navigate와 검색 히스토리 관리)
  const handleSearch = useCallback(
    (item) => {
      if (!item) return;
      addSearchHistory(item);
      setIsFisrtSearch(false);
      setIsSearchFocus(false);
      reset(item);
      navigate(`?text=${encodeURIComponent(item.searchInputText)}`);
    },
    [addSearchHistory, navigate, reset, setIsFisrtSearch, setIsSearchFocus]
  );

  // 검색 입력값이 변경될 때 자동 실행
  useEffect(() => {
    if (searchInputText) {
      handleSearch({ searchInputText });
    }
  }, [searchInputText, handleSearch]);

  return [handleSearch];
};

export default useNavigateHandler;
