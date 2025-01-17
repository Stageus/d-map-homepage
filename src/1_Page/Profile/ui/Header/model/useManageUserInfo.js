import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserInfo from "../../../../../3_Entity/Account/getUserInfo";

const useManageUserInfo = () => {
  const { userIdx } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userIdx) {
        return;
      }
      const data = await getUserInfo(userIdx);
      setUserData(data);
    };

    fetchUserData();
  }, [userIdx]);

  return userData;
};

export default useManageUserInfo;
