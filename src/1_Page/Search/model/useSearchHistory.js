import { useState, useEffect, useCallback } from "react";

const MAX_ITEMS = 10; // 로컬 스토리지 아이템 수 제한

const useSearchHistory = () => {
  const [listItems, setListItems] = useState([]);

  // 로컬 스토리지에서 데이터 가져오기 (렌더링 시)
  useEffect(() => {
    const storedData = localStorage.getItem("searchHistory");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    if (parsedData) {
      setListItems(parsedData);
    }
  }, []);

  // 검색 기록 추가 (최대 10개 제한)
  const addSearchHistory = useCallback((item) => {
    if (!item) return;
    setListItems((prevItems) => {
      const updatedItems = [item, ...prevItems.filter((i) => i !== item)].slice(
        0,
        MAX_ITEMS
      );
      return updatedItems;
    });
  }, []);

  // 검색 기록 삭제
  const deleteSearchHistory = useCallback((itemToDelete) => {
    setListItems((prevItems) => {
      return prevItems.filter((item) => item !== itemToDelete);
    });
  }, []);

  // 검색 기록 초기화
  const clearSearchHistory = useCallback(() => {
    setListItems([]);
  }, []);

  // 컴포넌트 언마운트 시 로컬 스토리지에 저장
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("searchHistory", JSON.stringify(listItems));
    };
    window.addEventListener("beforeunload", saveToLocalStorage);
    return () => {
      saveToLocalStorage();
      window.removeEventListener("beforeunload", saveToLocalStorage);
    };
  }, [listItems]);

  return {
    listItems,
    addSearchHistory,
    deleteSearchHistory,
    clearSearchHistory,
  };
};

export default useSearchHistory;
