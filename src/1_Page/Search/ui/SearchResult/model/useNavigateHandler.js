import { useNavigate } from "react-router-dom";

const useNavigateHandler = () => {
  const navigate = useNavigate();
  const handleNavigate = (idx) => {
    navigate(`/profile/${idx}`); // idx를 기반으로 프로필 페이지로 이동
  };
  return { handleNavigate };
};
export default useNavigateHandler;
