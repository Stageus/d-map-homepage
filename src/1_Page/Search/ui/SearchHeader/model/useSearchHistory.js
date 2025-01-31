import { useState, useEffect, useCallback } from "react";

const MAX_ITEMS = 20; // 로컬 스토리지 아이템 수 제한

const useSearchHistory = () => {
  const [searchHistoryList, setSearchListItems] = useState([]);

  // 로컬 스토리지에서 데이터 가져오기 (렌더링 시)
  useEffect(() => {
    const storedData = localStorage.getItem("searchHistory");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    if (parsedData) {
      setSearchListItems(parsedData);
    }
  }, []);

  // 검색 기록 추가
  const addSearchHistory = useCallback((item) => {
    if (!item) return;
    setSearchListItems((prevItems) => {
      const updatedItems = [
        item,
        ...prevItems.filter((i) => i.searchInputText !== item.searchInputText),
      ].slice(0, MAX_ITEMS);
      return updatedItems;
    });
  }, []);

  // 검색 기록 삭제
  const deleteSearchHistory = useCallback((itemToDelete) => {
    console.log(itemToDelete);
    setSearchListItems((prevItems) => {
      return prevItems.filter((item) => item !== itemToDelete);
    });
  }, []);

  // 검색 기록 초기화
  const clearSearchHistory = useCallback(() => {
    setSearchListItems([]);
  }, []);

  // 컴포넌트 언마운트 시 로컬 스토리지에 저장
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistoryList));
    };
    window.addEventListener("beforeunload", saveToLocalStorage);
    return () => {
      saveToLocalStorage();
      window.removeEventListener("beforeunload", saveToLocalStorage);
    };
  }, [searchHistoryList]);

  return [
    searchHistoryList,
    addSearchHistory,
    deleteSearchHistory,
    clearSearchHistory,
  ];
};

export default useSearchHistory;
