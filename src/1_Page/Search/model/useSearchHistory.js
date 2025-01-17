import { useState, useEffect } from "react";

const useSearchHistory = () => {
  const [listItems, setListItems] = useState([]);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedData = localStorage.getItem("searchHistory");
    if (storedData) {
      setListItems(JSON.parse(storedData));
    }
  }, []);

  // 검색 기록 추가 함수
  const addSearchHistory = (item) => {
    if (!item) return; // 빈 입력 방지

    setListItems((prevItems) => {
      const updatedItems = [item, ...prevItems.filter((i) => i !== item)];
      localStorage.setItem("searchHistory", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // 검색 기록 삭제 함수
  const clearSearchHistory = () => {
    setListItems([]);
    localStorage.removeItem("searchHistory");
  };

  return { listItems, addSearchHistory, clearSearchHistory };
};

export default useSearchHistory;
