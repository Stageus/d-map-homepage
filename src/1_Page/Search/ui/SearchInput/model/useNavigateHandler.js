import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useNavigateHandler = (reset, addSearchHistory) => {
  const navigate = useNavigate();

  // 검색 수행 함수
  const navigateToSearch = (data) => {
    addSearchHistory(data);
    navigate(`?text=${encodeURIComponent(data.searchInputText)}`); // 공백과 특수문자 인코딩
  };

  const navigateToHome = () => {
    navigate(`/search`); // 공백과 특수문자 인코딩
  };
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기

  useEffect(() => {
    reset({ searchInputText: searchInputText || "" });
  }, [searchInputText, reset]);
  return { navigateToSearch, navigateToHome };
};
export default useNavigateHandler;
