import React, { useEffect, useState } from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import SearchHistory from "./ui/SearchHistory";

const Search = () => {
  const [isFirstSearch, setIsFisrtSearch] = useState(true);
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  useEffect(() => {
    console.log(isSearchFocus);
  }, [isSearchFocus]);

  return (
    <>
      <STYLE.BodyContainer>
        {!isFirstSearch && <SearchResult />}
        <SearchHistory
          isSearchFocus={isSearchFocus}
          isFirstSearch={isFirstSearch}
          setIsFisrtSearch={setIsFisrtSearch}
          setIsSearchFocus={setIsSearchFocus}
        />
      </STYLE.BodyContainer>
      <SearchInput
        setIsSearchFocus={setIsSearchFocus}
        setIsFisrtSearch={setIsFisrtSearch}
      />
    </>
  );
};

export default Search;
