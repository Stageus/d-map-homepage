import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useNavigateHandler from "./model/useNavigateHandler";
import STYLE from "./style";
import useSearchHistory from "./model/useSearchHistory";

const SearchInput = (props) => {
  const { setIsSearchFocus, setIsFisrtSearch, isSearchFocus, isFirstSearch } =
    props;
  const inputRef = useRef(null); // input 태그 참조 생성

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const [searchHistoryList, addSearchHistory, deleteSearchHistory] =
    useSearchHistory();

  const { navigateToSearch } = useNavigateHandler(reset, addSearchHistory);
  const onSubmit = (data) => {
    handleSubmit(navigateToSearch(data));
    setIsFisrtSearch(false);
    inputRef.current?.blur(); // 포커스 해제
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsSearchFocus(false);
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      {isFirstSearch && (
        <STYLE.SearchHistoryContainer>
          <STYLE.List>
            {searchHistoryList.length !== 0 ? (
              searchHistoryList.map((item) => (
                <STYLE.ListBox>
                  <STYLE.ListItem
                    onClick={() => {
                      addSearchHistory(item);
                      navigateToSearch(item);
                      setIsFisrtSearch(false);
                      setIsSearchFocus(false);
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
              <STYLE.ListItem>검색기록이 없습니다</STYLE.ListItem>
            )}
          </STYLE.List>
        </STYLE.SearchHistoryContainer>
      )}

      <STYLE.Container>
        <STYLE.Box>
          <STYLE.InputContainer>
            <STYLE.Input
              placeholder="검색어를 입력하세요"
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchFocus(true)}
              onBlur={() => setIsSearchFocus(false)}
              {...register("searchInputText", {
                required: "검색어를 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,\s]{2,100}$/,
                  message:
                    "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다.",
                },
              })}
            />
            <STYLE.Icon>🔍</STYLE.Icon>
          </STYLE.InputContainer>
          <STYLE.ErrorContainer>
            <STYLE.ErrorMessage>{errors.message}</STYLE.ErrorMessage>
          </STYLE.ErrorContainer>

          {isSearchFocus &&
            !isFirstSearch &&
            searchHistoryList.length !== 0 && (
              <STYLE.InputContainerInSearchHisoty>
                <STYLE.List>
                  {searchHistoryList.map((item, index) => (
                    <STYLE.ListItem key={index}>
                      <STYLE.LeftSection>
                        <STYLE.SearchText
                          onClick={() => {
                            addSearchHistory(item);
                            navigateToSearch(item);
                            setIsFisrtSearch(false);
                            setIsSearchFocus(false);
                          }}>
                          {item.searchInputText}
                        </STYLE.SearchText>
                        <STYLE.ListDeleteButton
                          onClick={() => {
                            deleteSearchHistory(item);
                          }}>
                          &times;
                        </STYLE.ListDeleteButton>
                      </STYLE.LeftSection>
                    </STYLE.ListItem>
                  ))}
                </STYLE.List>
              </STYLE.InputContainerInSearchHisoty>
            )}
        </STYLE.Box>
      </STYLE.Container>
    </>
  );
};

export default SearchInput;
