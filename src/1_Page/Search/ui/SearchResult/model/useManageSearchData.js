import { useSearchParams } from "react-router-dom";
import useGetNicknameSearchData from "../../../../../3_Entity/Search/useGetNicknameSearchData";
import useGetSearchPointData from "../../../../../3_Entity/Search/useGetSearchPointData";
import { useEffect, useState } from "react";

const useManageSearchData = (page) => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text");

  const [nickNameData, nickNameLoading, nicknameHasMoreContent] =
    useGetNicknameSearchData(searchInputText, page.nickname);

  const [searchPointData, searchPointLoading, searchPointHasMoreContent] =
    useGetSearchPointData(searchInputText, page.searchpoint);

  const [searchDataNicnkname, setSearchDataNicnkname] = useState([]);
  const [searchDataSearchpoint, setSearchDataSearchpoint] = useState([]);

  useEffect(() => {
    setSearchDataNicnkname(nickNameData);
  }, [nickNameData]);

  useEffect(() => {
    setSearchDataSearchpoint(searchPointData);
  }, [searchPointData]);

  return {
    searchDataNicnkname,
    searchDataSearchpoint,
    nickNameLoading,
    searchPointLoading,
    nicknameHasMoreContent,
    searchPointHasMoreContent,
  };
};
export default useManageSearchData;
