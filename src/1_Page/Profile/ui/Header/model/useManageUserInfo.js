import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserInfo from "../../../../../3_Entity/Account/getUserInfo";

const useManageUserInfo = () => {
  const { userIdx } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  const handleChangeNickName = (nickname) => {
    setUserInfo((pre) => {
      return { ...pre, nickname };
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userIdx) {
        return;
      }
      const data = await getUserInfo(userIdx);
      setUserInfo(data);
    };

    fetchUserData();
  }, [userIdx]);

  const handleImageChange = (imageFile) => {
    const objectUrl = URL.createObjectURL(imageFile);
    setUserInfo((prev) => ({ ...prev, image_url: objectUrl }));
  };

  return { userInfo, handleImageChange, handleChangeNickName };
};

export default useManageUserInfo;
