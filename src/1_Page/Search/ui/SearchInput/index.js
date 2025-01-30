import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useNavigateHandler from "./model/useNavigateHandler";
import STYLE from "./style";
import useSetInputText from "./model/useSetInputText";

const SearchInput = (props) => {
  const { navigateToSearch } = useNavigateHandler();
  const { setIsSearchFocus, setIsFisrtSearch } = props;
  const inputRef = useRef(null); // input 태그 참조 생성

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useSetInputText(reset);

  // 클릭 시 검증 후 제출
  const onSubmit = (data) => {
    handleSubmit(navigateToSearch)(data);
    setIsFisrtSearch(false);
    inputRef.current?.blur(); // 포커스 해제
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      <STYLE.Container>
        <STYLE.InputContainer $isError={errors?.searchInputText}>
          <STYLE.Input
            ref={inputRef}
            placeholder="검색할 내용을 입력하세요"
            {...register("searchInputText", {
              required: "값을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,\s]{2,100}$/,
                message:
                  "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다.",
              },
            })}
            $isError={errors?.searchInputText}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsSearchFocus(true);
            }}
            onBlur={() => {
              setIsSearchFocus(false);
            }}
          />
          <STYLE.Icon onClick={handleSubmit(onSubmit)}>🔍</STYLE.Icon>
        </STYLE.InputContainer>
        <STYLE.ErrorContainer>
          <STYLE.ErrorMessage>
            {errors?.searchInputText?.message}
          </STYLE.ErrorMessage>
        </STYLE.ErrorContainer>
      </STYLE.Container>
    </>
  );
};

export default SearchInput;
