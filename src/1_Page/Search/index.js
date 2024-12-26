import React from "react";
import STYLE from "./style";

const Search = () => {
  return (
    <>
      <STYLE.Container>
        <STYLE.InputContainer>
          <STYLE.Input placeholder="검색할 내용을 입력하세요" />
          <STYLE.Icon>🔍</STYLE.Icon>
        </STYLE.InputContainer>
        <STYLE.List>
          <STYLE.ListItem>류동호</STYLE.ListItem>
          <STYLE.ListItem>김연호</STYLE.ListItem>
          <STYLE.ListItem>속초</STYLE.ListItem>
          <STYLE.ListItem>인천</STYLE.ListItem>
        </STYLE.List>
      </STYLE.Container>
    </>
  );
};

export default Search;
