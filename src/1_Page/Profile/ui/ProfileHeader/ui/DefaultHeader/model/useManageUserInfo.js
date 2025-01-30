import { useEffect, useState } from "react";

const useManageUserInfo = (userInfoData) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(userInfoData);
  }, [userInfoData]);

  const nicknameChangeEvent = (nickname) => {
    setUserInfo((pre) => {
      return { ...pre, nickname };
    });
  };

  const profileImageChangeEvent = (imageFile) => {
    const objectUrl = URL.createObjectURL(imageFile);
    setUserInfo((prev) => ({ ...prev, image_url: objectUrl }));
  };

  return [userInfo, profileImageChangeEvent, nicknameChangeEvent];
};

export default useManageUserInfo;
