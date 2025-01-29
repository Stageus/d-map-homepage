import { useNavigate } from "react-router-dom";

const useNavigateHandler = () => {
  const navigate = useNavigate();
  // 검색 수행 함수
  const navigateToSearch = (data) => {
    navigate(`/search?text=${encodeURIComponent(data.searchInputText)}`); // 공백과 특수문자 인코딩
  };
  return { navigateToSearch };
};
export default useNavigateHandler;
