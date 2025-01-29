import React from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import SearchHistory from "./ui/SearchHistory";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기

  return (
    <>
      <STYLE.BodyContainer>
        {searchInputText ? <SearchResult /> : <SearchHistory />}
      </STYLE.BodyContainer>
      <SearchInput />
    </>
  );
};

export default Search;
