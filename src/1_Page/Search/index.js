import React from "react";
import STYLE from "./style";
import SearchInput from "./ui/SearchInput";
import SearchResult from "./ui/SearchResult";
import useNavigateHandler from "./model/useNavigateHandler";
import useSearchHistory from "./model/useSearchHistory";

const Search = () => {
  const { searchInputText, handleListClick } = useNavigateHandler();
  const { listItems, addSearchHistory, deleteSearchHistory } =
    useSearchHistory();

  return (
    <>
      <STYLE.BodyContainer>
        {searchInputText ? (
          <SearchResult />
        ) : (
          <STYLE.Container>
            <STYLE.List>
              {listItems.length > 0 ? (
                listItems.map((item) => (
                  <STYLE.ListBox>
                    <STYLE.ListItem
                      onClick={() => {
                        handleListClick(item.searchInputText);
                        addSearchHistory(item);
                      }}>
                      {item.searchInputText}
                    </STYLE.ListItem>
                    <STYLE.ListDeleteButton
                      onClick={() => {
                        deleteSearchHistory(item);
                      }}>
                      &times;
                    </STYLE.ListDeleteButton>
                  </STYLE.ListBox>
                ))
              ) : (
                <STYLE.ListItem>검색 결과가 없습니다</STYLE.ListItem>
              )}
            </STYLE.List>
          </STYLE.Container>
        )}
      </STYLE.BodyContainer>
      <SearchInput
        addSearchHistory={addSearchHistory}
        searchInputText={searchInputText}
      />
    </>
  );
};

export default Search;
