import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import useNavigateHandler from "./model/useNavigateHandler";
import STYLE from "./style";
import useSearchHistory from "./model/useSearchHistory";

const SearchBox = (props) => {
  const {
    setIsSearchFocus,
    setIsFisrtSearch,
    isSearchFocus,
    isFirstSearch,
    searchInputText,
  } = props;
  const inputRef = useRef(null); // input 태그 참조 생성

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [searchHistoryList, addSearchHistory, deleteSearchHistory] =
    useSearchHistory();

  const [onSearchSelect] = useNavigateHandler(
    reset,
    searchInputText,
    addSearchHistory,
    setIsFisrtSearch,
    setIsSearchFocus
  );

  // 검색 제출 함수
  const onSubmit = handleSubmit((data) => {
    onSearchSelect(data);
  });

  // 엔터 키 이벤트 핸들러 (onSubmit과 중복 제거)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 기본 제출 방지
        onSubmit(); // onSubmit 호출
      }
    },
    [onSubmit]
  );

  return (
    <>
      {/* 검색 기록 리스트 */}
      {isFirstSearch && (
        <STYLE.SearchHistoryContainer>
          <STYLE.List>
            {searchHistoryList.length > 0 ? (
              searchHistoryList.map((item) => (
                <STYLE.ListBox key={item.searchInputText}>
                  <STYLE.ListItem onClick={() => onSearchSelect(item)}>
                    {item.searchInputText}
                  </STYLE.ListItem>
                  <STYLE.ListDeleteButton
                    onClick={() => deleteSearchHistory(item)}>
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

      {/* 검색창 */}
      <STYLE.Container>
        <STYLE.Box>
          <STYLE.InputContainer>
            {!isFirstSearch && isSearchFocus && (
              <STYLE.Icon onClick={() => setIsSearchFocus(false)}>←</STYLE.Icon>
            )}
            <STYLE.Input
              ref={inputRef}
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
            <STYLE.Icon onClick={onSubmit}>🔍</STYLE.Icon>
          </STYLE.InputContainer>

          {/* 입력 중 검색 기록 표시 */}
          {isSearchFocus && !isFirstSearch && searchHistoryList.length > 0 && (
            <STYLE.InputContainerInSearchHisoty>
              <STYLE.List>
                {searchHistoryList.map((item) => (
                  <STYLE.ListItem key={item.searchInputText}>
                    <STYLE.LeftSection>
                      <STYLE.SearchText onClick={() => onSearchSelect(item)}>
                        {item.searchInputText}
                      </STYLE.SearchText>
                      <STYLE.ListDeleteButton
                        onClick={() => deleteSearchHistory(item)}>
                        &times;
                      </STYLE.ListDeleteButton>
                    </STYLE.LeftSection>
                  </STYLE.ListItem>
                ))}
              </STYLE.List>
            </STYLE.InputContainerInSearchHisoty>
          )}
        </STYLE.Box>

        {/* 에러 메시지 */}
        {errors.searchInputText && (
          <STYLE.ErrorContainer>
            <STYLE.ErrorMessage>
              {errors.searchInputText.message}
            </STYLE.ErrorMessage>
          </STYLE.ErrorContainer>
        )}
      </STYLE.Container>
    </>
  );
};

export default React.memo(SearchBox);
