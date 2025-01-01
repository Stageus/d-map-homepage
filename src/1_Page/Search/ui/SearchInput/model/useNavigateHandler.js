import { useNavigate } from "react-router-dom";

const useNavigateHandler = (addSearchHistory) => {
  const navigate = useNavigate();
  // 검색 수행 함수
  const navigateToSearch = (data) => {
    addSearchHistory(data);
    navigate(`/search?text=${encodeURIComponent(data.searchInputText)}`);
  };
  return { navigateToSearch };
};
export default useNavigateHandler;
