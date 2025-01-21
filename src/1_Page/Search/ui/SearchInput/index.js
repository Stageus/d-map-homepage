import React from "react";
import { useForm } from "react-hook-form";
import useNavigateHandler from "./model/useNavigateHandler";
import STYLE from "./style";
import useSetInputText from "./model/useSetInputText";

const SearchInput = (props) => {
  const { searchInputText, addSearchHistory } = props;
  const { navigateToSearch } = useNavigateHandler(addSearchHistory);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useSetInputText(reset, searchInputText);

  return (
    <>
      <STYLE.InputContainer $isError={errors.searchInputText}>
        <STYLE.Input
          placeholder="검색할 내용을 입력하세요"
          {...register("searchInputText", {
            required: "값을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,\s]{2,100}$/,
              message:
                "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다.",
            },
          })}
          $isError={errors.searchInputText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(navigateToSearch)();
            }
          }}
        />
        <STYLE.Icon onClick={handleSubmit(navigateToSearch)}>🔍</STYLE.Icon>
      </STYLE.InputContainer>
      <STYLE.ErrorMessage>
        {errors.searchInputText && errors.searchInputText.message}
      </STYLE.ErrorMessage>
    </>
  );
};

export default SearchInput;
