import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getUserInfo from "../../../../../3_Entity/Account/getUserInfo";

const useManageUserInfo = (tabIndex) => {
  const { userIdx } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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
      try {
        const data = await getUserInfo(userIdx);
        setUserInfo(data);
      } catch (error) {
        navigate(-1);
      }
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
