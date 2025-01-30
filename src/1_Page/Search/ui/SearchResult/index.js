import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import STYLE from "./style";
import empty_profile_icon from "./assets/empty_profile_icon.svg";

import SearchPointListTab from "./ui/SearchPointListTab";
import useTab from "./model/useTab";
import useInfinityScroll from "./model/useInfinityScroll";

import useGetNicknameSearchData from "../../../../3_Entity/Search/useGetNicknameSearchData";
import useGetSearchPointData from "../../../../3_Entity/Search/useGetSearchPointData";

const SearchHeader = (props) => {
  const { searchInputText } = props;

  const navigate = useNavigate();

  const [activeTab, handleTabName, handleTabLocation] = useTab();

  // 무한 스크롤
  const [nicknamePage, nicknameObserveRef] = useInfinityScroll();
  const [searchPointPage, searchPointObserveRef] = useInfinityScroll();

  // 데이터 검색
  const [nickNameData, nickNameLoading, nicknameHasMoreContent] =
    useGetNicknameSearchData(searchInputText, nicknamePage);
  const [searchPointData, searchPointLoading, searchPointHasMoreContent] =
    useGetSearchPointData(searchInputText, searchPointPage);

  useEffect(() => {
    if (nickNameData.length !== 0) handleTabName();
    if (searchPointData.length !== 0) handleTabLocation();
  }, [nickNameData, searchPointData]);

  const filterdSearch = searchPointData.map((item) => {
    return {
      ...item,
      center: {
        lat: item.center.lat,
        lng: item.center.lot,
      },
    };
  });

  return (
    <>
      {/* 탭 */}
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={activeTab === "nickname"}>
          {searchPointData?.length === 0 ? (
            <STYLE.EmptyMessage>없는 장소입니다.</STYLE.EmptyMessage>
          ) : (
            <>
              <STYLE.ResulTab>
                <SearchPointListTab
                  trackingImageList={filterdSearch}
                  hasMoreContent={searchPointHasMoreContent}
                  observeRef={searchPointObserveRef}
                />
              </STYLE.ResulTab>
              {searchPointLoading && (
                <STYLE.LoaderContainer>
                  <STYLE.Loader />
                </STYLE.LoaderContainer>
              )}
            </>
          )}

          {/* 이름 탭 */}
          {nickNameData?.length === 0 ? (
            <STYLE.EmptyMessage>없는 이름입니다.</STYLE.EmptyMessage>
          ) : (
            <STYLE.ResulTab>
              {nickNameData?.map((result, index) => (
                <STYLE.NicckNameContainer
                  key={result.idx}
                  ref={
                    index === nickNameData.length - 1 && nicknameHasMoreContent
                      ? nicknameObserveRef
                      : null
                  }
                  onClick={() => {
                    navigate(`/profile/${result.idx}`); // idx를 기반으로 프로필 페이지로 이동
                  }}>
                  <STYLE.ProfileIcon
                    src={result.img_url ? result.img_url : empty_profile_icon}
                  />
                  <STYLE.NickNameText>{result.nickname}</STYLE.NickNameText>
                </STYLE.NicckNameContainer>
              ))}
              {nickNameLoading && (
                <STYLE.LoaderContainer>
                  <STYLE.Loader />
                </STYLE.LoaderContainer>
              )}
            </STYLE.ResulTab>
          )}
        </STYLE.Slider>
      </STYLE.SliderWrapper>

      {/* 탭 버튼 */}
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={activeTab === "searchpoint"} />
          <STYLE.Tab
            $active={activeTab === "searchpoint"}
            onClick={handleTabLocation}>
            장소
          </STYLE.Tab>
          <STYLE.Tab $active={activeTab === "nickname"} onClick={handleTabName}>
            이름
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>
    </>
  );
};

export default React.memo(SearchHeader);
