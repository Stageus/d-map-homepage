import { useNavigate } from "react-router-dom";
import deleteAccountUser from "../../../3_Entity/Account/deleteUserAccount";

const useNavigateHandler = (confimTwoBtnToggle, errorModalOpen) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    confimTwoBtnToggle();
    console.log("로그아웃 실행");
  };

  const handleDeleteAccount = async () => {
    confimTwoBtnToggle();
    try {
      const result = await deleteAccountUser();
      if (result) {
        navigate(`/login`);
      }
    } catch (error) {
      errorModalOpen(error.message);
    }
  };

  const handleLogin = () => {
    // 백엔드 로그인 URL
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // 이전 큐로 이동
  };

  return [handleLogin, handleDeleteAccount, handleBack, handleLogout];
};
export default useNavigateHandler;
