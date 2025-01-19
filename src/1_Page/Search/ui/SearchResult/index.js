import React from "react";
import STYLE from "./style";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useTab from "./model/useTab";
import useNavigateHandler from "./model/useNavigateHandler";
import useInfinityScroll from "./model/useInfinityScroll";

const SearchResult = (props) => {
  const { searchInputText } = props;

  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab(); // 탭 관리
  const { page, handleScroll } = useInfinityScroll();

  // const { searchData } = useGetResult(searchInputText, activeTab); // 검색 데이터 호출 api
  const searchData = [123, 132];
  const { handleNavigate } = useNavigateHandler();

  return (
    <>
      {/* 탭 전환 버튼 */}
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

      {/* 슬라이더 */}
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={activeTab === "장소" ? 0 : 1}>
          {/* 장소 탭 */}
          <STYLE.ResultList onScroll={handleScroll}>
            {searchData?.length === 0 ? (
              <STYLE.EmptyMessage>없는 장소입니다.</STYLE.EmptyMessage>
            ) : (
              searchData?.map((result) => (
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
          <STYLE.ResultList onScroll={handleScroll}>
            {searchData?.length === 0 ? (
              <STYLE.EmptyMessage>없는 이름입니다.</STYLE.EmptyMessage>
            ) : (
              searchData?.map((result) => (
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
