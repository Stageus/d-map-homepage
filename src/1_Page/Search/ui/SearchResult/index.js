import React from "react";
import STYLE from "./style";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useGetResult from "../../../../3_Entity/Search/useGetSearchData";
import useTab from "./model/useTab";
import useNavigateHandler from "./model/useNavigateHandler";

const SearchResult = (props) => {
  const { searchInputText } = props;
  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab(); // 탭 관리
  const { searchData } = useGetResult(searchInputText, activeTab); // 검색 데이터 호출 api
  const { handleNavigate } = useNavigateHandler();

  return (
    <>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={handleGetPresentTab("장소")} />
          <STYLE.Tab
            $active={handleGetPresentTab("장소")}
            onClick={handleTabLocation}>
            장소
          </STYLE.Tab>
          <STYLE.Tab
            $active={handleGetPresentTab("이름")}
            onClick={handleTabName}>
            이름
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>
      <STYLE.ResultList>
        {searchData?.length === 0 ? (
          <STYLE.EmptyMessage>없는 {activeTab}입니다.</STYLE.EmptyMessage>
        ) : handleGetPresentTab("장소") ? (
          searchData?.map((result) => (
            <>
              <STYLE.MapPreview
                onClick={() => {
                  handleNavigate(result.idx);
                }}>
                <STYLE.TitleContainer>
                  <STYLE.ProfileIcon src={result.image} />
                  <STYLE.Title>
                    {result.nickname}- {result.searchpoint}
                  </STYLE.Title>
                </STYLE.TitleContainer>
                <TrackingImage
                  data={{ ...result, draggable: false, height: "300px" }}
                />
              </STYLE.MapPreview>
            </>
          ))
        ) : (
          searchData?.map((result) => (
            <STYLE.NicckNameContainer
              onClick={() => {
                handleNavigate(result.idx);
              }}>
              <STYLE.ProfileIcon src={result.image} />
              <STYLE.NickNameText>{result.nickname}</STYLE.NickNameText>
            </STYLE.NicckNameContainer>
          ))
        )}
      </STYLE.ResultList>
    </>
  );
};

export default SearchResult;
