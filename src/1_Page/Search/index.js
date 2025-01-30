import React, { useState } from "react";
import STYLE from "./style";
import SearchBox from "./ui/SearchBox";
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
      <SearchBox
        isSearchFocus={isSearchFocus}
        isFirstSearch={isFirstSearch}
        setIsSearchFocus={setIsSearchFocus}
        setIsFisrtSearch={setIsFisrtSearch}
      />
    </>
  );
};

export default Search;
