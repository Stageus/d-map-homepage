import { useNavigate } from "react-router-dom";
// import getUserInfo from "../../../3_Entity/Account/getMyInfo";
import { useEffect, useState } from "react";
import deleteAccountUser from "../../../3_Entity/Account/deleteUserAccount";

const useManageUser = (confimTwoBtnToggle, errorModalOpen) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      // const data = await getUserInfo();
      const data = {
        idx: "7",
        nickname: "이쁜호랑이",
        image: "/home/account/image.png",
        isMine: true,
        share_tracking_length: "5",
        total_tracking_length: "7",
      };
      setUserInfo(data);
    } catch (error) {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  return {
    userInfo,
    handleLogin,
    handleDeleteAccount,
    handleBack,
    handleLogout,
  };
};
export default useManageUser;
