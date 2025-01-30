import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useNavigateHandler = (
  reset,
  addSearchHistory,
  searchInputText,
  onSearchSelect
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchInputText) return;
    onSearchSelect({ searchInputText });
  }, [searchInputText]);

  // 검색 수행 함수
  const navigateToSearch = (data) => {
    addSearchHistory(data);
    navigate(`?text=${encodeURIComponent(data.searchInputText)}`); // 공백과 특수문자 인코딩
  };

  useEffect(() => {
    reset({ searchInputText: searchInputText || "" });
  }, [searchInputText, reset]);
  return [navigateToSearch];
};
export default useNavigateHandler;
