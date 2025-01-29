import { useParams } from "react-router-dom";
import useGetMyInfo from "../../../3_Entity/Account/useGetMyInfo";
import useGetUserInfo from "../../../3_Entity/Account/useGetUserInfo";
import { useMemo } from "react";

const useGetProfile = () => {
  const { userIdx } = useParams();
  const [myInfo] = useGetMyInfo(userIdx); // userIdx에 me 또는 공백시 fetch
  const [anotherUserInfo] = useGetUserInfo(userIdx); // userIdx가 int면 fetch
  const userInfoData = useMemo(
    () => myInfo || anotherUserInfo,
    [myInfo, anotherUserInfo]
  );
  return [userInfoData];
};
export default useGetProfile;
