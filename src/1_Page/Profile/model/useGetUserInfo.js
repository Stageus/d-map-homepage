import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getUserInfo from "../../../3_Entity/Account/getUserInfo";
import getMyInfo from "../../../3_Entity/Account/getMyInfo";

const useGetUserInfo = (showErrorModal) => {
  const { userIdx } = useParams();
  const navigate = useNavigate();
  const [userInfoData, setUserInfoData] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    if (!userIdx) {
      navigate(-1);
      return;
    }
    try {
      if (userIdx === "me") {
        const userInfoData = await getMyInfo();
        setUserInfoData(userInfoData);
        return;
      }
      const userInfoData = await getUserInfo(userIdx);
      setUserInfoData(userInfoData);
    } catch (err) {
      showErrorModal(err.message);
    } finally {
    }
  }, [userIdx]);

  const memoizedUserInfoData = useMemo(() => userInfoData, [userInfoData]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { memoizedUserInfoData };
};

export default useGetUserInfo;
