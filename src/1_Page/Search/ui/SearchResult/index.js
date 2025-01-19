import React, { useEffect } from "react";
import STYLE from "./style";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useTab from "./model/useTab";
import useNavigateHandler from "./model/useNavigateHandler";
import useInfinityScroll from "./model/useInfinityScroll";
import useManageSearchData from "./model/useManageSearchData";

const SearchResult = () => {
  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab(); // 탭 관리
  const { page, handleScroll } = useInfinityScroll(activeTab);

  const {
    searchDataNicnkname,
    searchDataSearchpoint,
    loading,
    hasMoreContent,
  } = useManageSearchData(page, activeTab);
  useEffect(() => {
    console.log(hasMoreContent);
  }, [hasMoreContent]);

  const { handleNavigate } = useNavigateHandler();

  return (
    <>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground
            $activeTabName={handleGetPresentTab("searchpoint")}
          />
          <STYLE.Tab
            $active={handleGetPresentTab("searchpoint")}
            onClick={handleTabLocation}>
            장소
          </STYLE.Tab>
          <STYLE.Tab
            $active={handleGetPresentTab("nickname")}
            onClick={handleTabName}>
            이름
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>

      {/* 슬라이더 */}
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={handleGetPresentTab("nickname")}>
          {/* 장소 탭 */}
          <STYLE.ResultList
            onScroll={hasMoreContent.nickname ? handleScroll : null}>
            {searchDataSearchpoint?.length === 0 ? (
              <STYLE.EmptyMessage>없는 장소입니다.</STYLE.EmptyMessage>
            ) : (
              searchDataSearchpoint?.map((result) => (
                <STYLE.MapPreview
                  key={result.idx}
                  onClick={() => {
                    handleNavigate(result.idx);
                  }}>
                  <STYLE.TitleContainer>
                    <STYLE.ProfileIcon src={result.image} />
                    <STYLE.Title>
                      {result.nickname} - {result.searchpoint}
                    </STYLE.Title>
                  </STYLE.TitleContainer>
                  <TrackingImage
                    data={{ ...result, draggable: false, height: "300px" }}
                  />
                </STYLE.MapPreview>
              ))
            )}
          </STYLE.ResultList>
          {/* 이름 탭 */}
          <STYLE.ResultList
            onScroll={hasMoreContent.searchpoint ? handleScroll : null}>
            {searchDataNicnkname?.length === 0 ? (
              <STYLE.EmptyMessage>없는 이름입니다.</STYLE.EmptyMessage>
            ) : (
              searchDataNicnkname?.map((result) => (
                <STYLE.NicckNameContainer
                  key={result.idx}
                  onClick={() => {
                    handleNavigate(result.idx);
                  }}>
                  <STYLE.ProfileIcon src={result.image} />
                  <STYLE.NickNameText>{result.nickname}</STYLE.NickNameText>
                </STYLE.NicckNameContainer>
              ))
            )}
          </STYLE.ResultList>
        </STYLE.Slider>
      </STYLE.SliderWrapper>
    </>
  );
};

export default SearchResult;
