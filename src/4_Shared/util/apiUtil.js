import React from "react";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;
export const fetchRequest = async (method, url, body = null, token = null) => {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token !== null) {
    config.headers.Authorization = token;
  }
  if (body !== null) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(url, config);

  return response;
};

export const useFetch = () => {
  const [serverState, setServerState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const request = async (method, endPoint, body = null) => {
    try {
      const config = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (true) { // 쿠키 검증후 업데이트로 수정 예정
        config.headers.Authorization = TEST_TOKEN;
      }
      if (body !== null) {
        config.body = JSON.stringify(body);
      }
      const response = await fetch(`${BASE_URL}${endPoint}`, config);

      const data = await response.json();
      const status = response.status;
      setServerState({...data, status});

      switch (status) {
        case 401:
          console.log("UnAuthorized access! ");
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
