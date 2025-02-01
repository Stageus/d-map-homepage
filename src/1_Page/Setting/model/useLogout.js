import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["userIdx", "token"]);

  const logout = () => {
    removeCookie("userIdx", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    removeCookie("accessToken", { path: "/" });
    navigate("/login");
  };

  return [logout];
};

export default useLogout;
