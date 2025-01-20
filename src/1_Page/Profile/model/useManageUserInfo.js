import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getUserInfo from "../../../3_Entity/Account/getUserInfo";

const useManageUserInfo = () => {
  const { userIdx } = useParams();
  const navigate = useNavigate();
  const [userInfoData, setUserInfoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    if (!userIdx) {
      navigate(-1);
      return;
    }
    try {
      setLoading(true);
      if (userIdx === "me") {
        const userInfoData = await getUserInfo("me");
        setUserInfoData(userInfoData);
      }
      const userInfoData = await getUserInfo(userIdx);
      setUserInfoData(userInfoData);
    } catch (err) {
      setError("사용자 정보를 불러오는 데 실패했습니다.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  }, [userIdx, navigate]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { userInfoData, loading, error };
};

export default useManageUserInfo;
