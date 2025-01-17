import React from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import useNavigateHandler from "./model/useNavigateHandler";
import useSearchHistory from "./model/useSearchHistory";

const Search = () => {
  const { searchInputText, handleListClick } = useNavigateHandler();
  const { listItems, addSearchHistory, clearSearchHistory } =
    useSearchHistory();

  return (
    <>
      <SearchInput
        addSearchHistory={addSearchHistory}
        searchInputText={searchInputText}
      />
      {searchInputText ? (
        <SearchResult searchInputText={searchInputText} />
      ) : (
        <STYLE.Container>
          <STYLE.List>
            {listItems.length > 0 ? (
              listItems.map((item) => (
                <STYLE.ListItem
                  onClick={() => {
                    handleListClick(item.searchInputText);
                  }}>
                  {item.searchInputText}
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
