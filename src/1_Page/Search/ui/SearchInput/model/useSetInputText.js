import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useSetInputText = (reset) => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기

  useEffect(() => {
    reset({ searchInputText: searchInputText || "" });
  }, [searchInputText, reset]);
};

export default useSetInputText;
