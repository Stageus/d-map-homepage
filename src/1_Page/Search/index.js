import React, { useState } from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";

const Search = () => {
  const [listItems] = useState(["류동호", "김연호", "속초", "인천"]); // 원본 리스트

  return (
    <>
      <STYLE.Container>
        <SearchInput />
        <STYLE.List>
          {listItems.length > 0 ? (
            listItems.map((item) => <STYLE.ListItem>{item}</STYLE.ListItem>)
          ) : (
            <STYLE.ListItem>검색 결과가 없습니다</STYLE.ListItem>
          )}
        </STYLE.List>
      </STYLE.Container>
    </>
  );
};

export default Search;
