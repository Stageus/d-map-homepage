import { useNavigate } from "react-router-dom";

const useManageUser = (handleConfirmModalClose) => {
  const handleLogout = () => {
    handleConfirmModalClose();
    console.log("로그아웃 실행");
  };

  const handleDeleteAccount = () => {
    handleConfirmModalClose();
    console.log("회원 탈퇴 실행");
  };

  const handleLogin = () => {
    // 백엔드 로그인 URL
    const backendLoginUrl = "https://example.com/api/login";
    window.location.href = backendLoginUrl;
  };
  const navigate = useNavigate(); // React Router의 navigate 함수

  const handleBack = () => {
    navigate(-1); // 이전 큐로 이동
  };

  return { handleLogin, handleDeleteAccount, handleBack, handleLogout };
};
export default useManageUser;
