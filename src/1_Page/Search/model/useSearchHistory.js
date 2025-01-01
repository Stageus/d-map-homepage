import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "../../../4_Shared/Cookie"; // 유틸리티 임포트

const useSearchHistory = () => {
  const [listItems, setListItems] = useState([]);

  // 초기화: 쿠키에서 검색 기록 가져오기
  useEffect(() => {
    const cookieData = getCookie("searchHistory");
    console.log(cookieData);
    if (cookieData) {
      setListItems(cookieData);
    }
  }, []);

  // 검색 기록 추가 함수
  const addSearchHistory = (item) => {
    if (!item) return; // 빈 입력 방지

    setListItems((prevItems) => {
      const updatedItems = [item, ...prevItems.filter((i) => i !== item)]; // 중복 제거 및 최신 항목 추가
      console.log(updatedItems);
      setCookie("searchHistory", updatedItems, { path: "/", maxAge: 604800 }); // 쿠키에 저장 (7일 유지)
      return updatedItems;
    });
  };

  // 검색 기록 삭제 함수
  const clearSearchHistory = () => {
    setListItems([]);
    deleteCookie("searchHistory"); // 쿠키에서 삭제
  };

  return { listItems, addSearchHistory, clearSearchHistory };
};

export default useSearchHistory;
