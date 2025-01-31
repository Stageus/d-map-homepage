import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const useFetch = () => {
  const [serverState, setServerState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);

  const request = async (
    method,
    endPoint,
    body = null,
    contentType = "application/json"
  ) => {
    try {
      let config = {
        method: method,
        headers: {
          "Content-Type": contentType,
          Authorization: cookies["accessToken"],
        },
      };

      // accessToken 만료시 재발급
      if (!cookies["accessToken"] && cookies["refreshToken"]) {
        console.log("만료");
        const response = await fetch(`${BASE_URL}/account/accesstoken`, config);
        const data = await response.json();
        const status = response.status;
        switch (status) {
          case 200:
            setCookies("accessToken", data);
            config.headers.Authorization = cookies["accessToken"];
            break;
          default:
            break;
        }
      }

      if (body !== null) {
        config.body = JSON.stringify(body);
      }
      const response = await fetch(`${BASE_URL}${endPoint}`, config);
      const data = await response.json();
      const status = response.status;
      setServerState({ ...data, status });

      switch (status) {
        case 401:
        case 403:
          alert("로그인이 필요합니다!");
          navigate("/login");
          break;
        case 404:
          console.log("404 Error...");
          break;
        case 500:
          console.log("Server Error: ", data.message);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};
