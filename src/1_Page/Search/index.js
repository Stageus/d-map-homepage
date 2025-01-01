import React, { useState } from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import useNavigateHandler from "./model/useNavigateHandler";

const Search = () => {
  const [listItems] = useState(["류동호", "김연호", "속초", "인천"]); // 원본 리스트
  const { searchInputText, handleListClick } = useNavigateHandler();

  return (
    <>
      <SearchInput searchInputText={searchInputText} />
      {searchInputText ? (
        <SearchResult searchInputText={searchInputText} />
      ) : (
        <STYLE.Container>
          <STYLE.List>
            {listItems.length > 0 ? (
              listItems.map((item) => (
                <STYLE.ListItem
                  onClick={() => {
                    handleListClick(item);
                  }}>
                  {item}
                </STYLE.ListItem>
              ))
            ) : (
              <STYLE.ListItem>검색 결과가 없습니다</STYLE.ListItem>
            )}
          </STYLE.List>
        </STYLE.Container>
      )}
    </>
  );
};

export default Search;
