import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useNavigateHandler from "./model/useNavigateHandler";
import STYLE from "./style";
import useSetInputText from "./model/useSetInputText";

// Yup 유효성 검사 스키마 정의
const searchInputSchema = yup.object().shape({
  searchInputText: yup
    .string()
    .required("값을 입력해주세요.")
    .matches(
      /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,\s]{2,100}$/,
      "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다."
    ),
});

const SearchInput = (props) => {
  const { searchInputText, addSearchHistory } = props;
  const { navigateToSearch } = useNavigateHandler(addSearchHistory);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  useSetInputText(reset, searchInputText);

  // 수동 검증 함수
  const validateInput = async () => {
    try {
      await searchInputSchema.validate(
        { searchInputText: watch("searchInputText") },
        { abortEarly: false }
      );
      clearErrors("searchInputText");
      return true;
    } catch (err) {
      setError("searchInputText", { type: "manual", message: err.errors[0] });
      return false;
    }
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (await validateInput()) {
        handleSubmit(navigateToSearch)();
      }
    }
  };

  // 클릭 시 검증 후 제출
  const onSubmit = async () => {
    if (await validateInput()) {
      handleSubmit(navigateToSearch)();
    }
  };

  return (
    <>
      <STYLE.Container>
        <STYLE.InputContainer $isError={errors?.searchInputText}>
          <STYLE.Input
            placeholder="검색할 내용을 입력하세요"
            {...register("searchInputText")}
            $isError={errors?.searchInputText}
            onKeyDown={handleKeyDown}
          />
          <STYLE.Icon onClick={onSubmit}>🔍</STYLE.Icon>
        </STYLE.InputContainer>
        <STYLE.ErrorMessage>
          {errors?.searchInputText?.message}
        </STYLE.ErrorMessage>
      </STYLE.Container>
    </>
  );
};

export default SearchInput;
