import { useEffect } from "react";

const useSetInputText = (reset, searchInputText) => {
  useEffect(() => {
    reset({ searchInputText: searchInputText || "" });
  }, [searchInputText, reset]);
};

export default useSetInputText;
