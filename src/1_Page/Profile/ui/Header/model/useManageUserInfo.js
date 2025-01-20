import { useEffect, useState } from "react";

const useManageUserInfo = (userInfoData) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(userInfoData);
  }, [userInfoData]);

  const handleChangeNickName = (nickname) => {
    setUserInfo((pre) => {
      return { ...pre, nickname };
    });
  };

  const handleProfileImageChange = (imageFile) => {
    const objectUrl = URL.createObjectURL(imageFile);
    setUserInfo((prev) => ({ ...prev, image_url: objectUrl }));
  };

  return { userInfo, handleProfileImageChange, handleChangeNickName };
};

export default useManageUserInfo;
