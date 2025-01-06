import { useNavigate, useSearchParams } from "react-router-dom";

const useNavigateHandler = () => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기

  const navigate = useNavigate();

  const handleListClick = (item) => {
    navigate(`?text=${item}`);
  };

  return { searchInputText, handleListClick };
};

export default useNavigateHandler;
