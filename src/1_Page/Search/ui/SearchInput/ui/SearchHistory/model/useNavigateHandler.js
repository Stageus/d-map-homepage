import { useNavigate, useSearchParams } from "react-router-dom";

const useNavigateHandler = () => {
  const navigate = useNavigate();

  const handleListClick = (item) => {
    navigate(`?text=${item}`);
  };

  return [handleListClick];
};

export default useNavigateHandler;
