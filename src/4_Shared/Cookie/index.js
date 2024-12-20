import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

// 모든 쿠키 삭제
export const deleteAllCookies = () => {
  const allCookies = cookies.getAll(); // 모든 쿠키 가져오기
  Object.keys(allCookies).forEach((cookieName) => {
    cookies.remove(cookieName, { path: "/" }); // 각 쿠키 삭제
  });
};

// 특정 쿠키 삭제
export const deleteCookie = (name) => {
  cookies.remove(name, { path: "/" }); // react-cookie의 remove 메서드 사용
};
