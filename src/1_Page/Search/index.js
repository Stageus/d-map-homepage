import React, { useState } from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";

const Search = () => {
  const [isFirstSearch, setIsFisrtSearch] = useState(true);
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  return (
    <>
      {!isFirstSearch && (
        <STYLE.BodyContainer
          onClick={() => {
            setIsSearchFocus(false);
          }}>
          {<SearchResult />}
        </STYLE.BodyContainer>
      )}
      <SearchInput
        isSearchFocus={isSearchFocus}
        isFirstSearch={isFirstSearch}
        setIsSearchFocus={setIsSearchFocus}
        setIsFisrtSearch={setIsFisrtSearch}
      />
    </>
  );
};

export default Search;
