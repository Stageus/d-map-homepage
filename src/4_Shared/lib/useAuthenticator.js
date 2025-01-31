import React from "react";
import { useCookies } from "react-cookie";

const useAuthenticator = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    cookies["accessToken"] ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return [isLogin];
};

export default useAuthenticator;
