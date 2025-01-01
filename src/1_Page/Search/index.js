import React, { useEffect, useState } from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [listItems] = useState(["류동호", "김연호", "속초", "인천"]); // 원본 리스트
  const [searchParams] = useSearchParams();

  const text = searchParams.get("text"); // 쿼리 값 가져오기

  return (
    <>
      <SearchInput />
      {text ? (
        <SearchResult text={text} />
      ) : (
        <STYLE.Container>
          <STYLE.List>
            {listItems.length > 0 ? (
              listItems.map((item) => <STYLE.ListItem>{item}</STYLE.ListItem>)
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
