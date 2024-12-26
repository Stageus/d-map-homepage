import useSearchValue from "./model/useSearchValue";
import STYLE from "./style";

const SearchInput = () => {
  const {
    isError,
    inputValue,
    errorMessage,
    navigateToSearch,
    handleKeyDown,
    setInputValue,
  } = useSearchValue();

  return (
    <>
      <STYLE.InputContainer>
        <STYLE.Input
          placeholder="검색할 내용을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          $isError={isError}
        />
        <STYLE.Icon onClick={navigateToSearch}>🔍</STYLE.Icon>
      </STYLE.InputContainer>
      {<STYLE.ErrorMessage>{errorMessage}</STYLE.ErrorMessage>}
    </>
  );
};

export default SearchInput;
