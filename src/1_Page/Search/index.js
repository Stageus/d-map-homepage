import React, { useState } from "react";
import STYLE from "./style";
import SearchHeader from "./ui/SearchHeader";
import SearchResult from "./ui/SearchResult";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기
  const [isFirstSearch, setIsFisrtSearch] = useState(true);
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  return (
    <>
      {!isFirstSearch && (
        <STYLE.BodyContainer
          onClick={() => {
            setIsSearchFocus(false);
          }}>
          {<SearchResult searchInputText={searchInputText} />}
        </STYLE.BodyContainer>
      )}
      <SearchHeader
        searchInputText={searchInputText}
        isSearchFocus={isSearchFocus}
        isFirstSearch={isFirstSearch}
        setIsSearchFocus={setIsSearchFocus}
        setIsFisrtSearch={setIsFisrtSearch}
      />
    </>
  );
};

export default Search;
