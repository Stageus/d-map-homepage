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
        method,
        headers: {
          "Content-Type": contentType,
          Authorization: cookies["accessToken"],
        },
      };

      if (body !== null) {
        config.body = JSON.stringify(body);
      }
      const response = await fetch(`${BASE_URL}${endPoint}`, config);
      const data = await response.json();
      const status = response.status;
      setServerState({ ...data, status });

      switch (status) {
        case 401:
          const response = await fetch(`${BASE_URL}/account/accesstoken`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies["refreshToken"],
            },
          });
          const data = await response.json();
          const status = response.status;
          switch (status) {
            case 200:
              const expires = new Date();
              expires.setMinutes(expires.getMinutes() + 30);
              setCookies("accessToken", data.accesstoken, {
                path: "/",
                expires,
              });
              config.headers.Authorization = data.accesstoken;
              console.log(config);
              break;
            default:
              alert("로그인이 필요합니다!");
              navigate("/login");
              break;
          }
          break;
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
