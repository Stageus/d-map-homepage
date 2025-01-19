import { useSearchParams } from "react-router-dom";
import useGetSearchData from "../../../../../3_Entity/Search/useGetSearchData";
import { useEffect, useState } from "react";

const useManageSearchData = (page, activeTab) => {
  const [searchParams] = useSearchParams();
  const searchInputText = searchParams.get("text"); // 쿼리 값 가져오기

  const [searchData, loading, hasMoreContent] = useGetSearchData(
    searchInputText,
    page,
    activeTab
  );

  const [searchDataNicnkname, setSearchDataNicnkname] = useState([]);
  const [searchDataSearchpoint, setSearchDataSearchpoint] = useState([]);

  useEffect(() => {
    setSearchDataNicnkname(searchData.nickname);
    setSearchDataSearchpoint(searchData.searchpoint);
  }, [searchData]);

  return {
    searchDataNicnkname,
    searchDataSearchpoint,
    loading,
    hasMoreContent,
  };
};
export default useManageSearchData;
