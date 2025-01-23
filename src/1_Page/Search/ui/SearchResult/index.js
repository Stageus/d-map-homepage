import React from "react";
import STYLE from "./style";
import StaticTrackingImage from "../../../../2_Widget/StaticTrackingImage";

import useTab from "./model/useTab";
import useNavigateHandler from "./model/useNavigateHandler";
import useInfinityScroll from "./model/useInfinityScroll";
import useManageSearchData from "./model/useManageSearchData";
import useModalHandler from "../../../../4_Shared/model/useModalHandler";
import TrackingImagePostList from "../../../../2_Widget/TrackingImagePostList";

const SearchResult = () => {
  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab(); // 탭 관리
  const { page, handleScroll, observeRef } = useInfinityScroll(activeTab);

  const {
    searchDataNicnkname,
    searchDataSearchpoint,
    nickNameLoading,
    searchPointLoading,
    nicknameHasMoreContent,
    searchPointHasMoreContent,
  } = useManageSearchData(page);

  const [isTrackingImageModalOpen, IsTrackingImageModalToggle] =
    useModalHandler();

  const { handleNavigate } = useNavigateHandler();

  return (
    <>
      {/* 탭 */}
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={handleGetPresentTab("nickname")}>
          {/* 장소 탭 */}
          <STYLE.ResultList
            onScroll={searchPointHasMoreContent.nickname ? handleScroll : null}>
            {searchDataSearchpoint?.length === 0 ? (
              <STYLE.EmptyMessage>없는 장소입니다.</STYLE.EmptyMessage>
            ) : (
              searchDataSearchpoint?.map((result) => (
                <STYLE.MapPreview
                  key={result.idx}
                  onClick={IsTrackingImageModalToggle}>
                  <STYLE.TitleContainer>
                    <STYLE.ProfileIcon src={result.image} />
                    <STYLE.Title>
                      {result.nickname} - {result.searchpoint}
                    </STYLE.Title>
                  </STYLE.TitleContainer>
                  <STYLE.TrackingImageWrapper>
                    <StaticTrackingImage
                      data={{ ...result, draggable: false, height: "200px" }}
                    />
                  </STYLE.TrackingImageWrapper>
                </STYLE.MapPreview>
              ))
            )}
            {searchPointLoading && (
              <STYLE.LoaderContainer>
                <STYLE.Loader />
              </STYLE.LoaderContainer>
            )}
          </STYLE.ResultList>

          {/* 이름 탭 */}
          <STYLE.ResultList
            onScroll={nicknameHasMoreContent.searchpoint ? handleScroll : null}>
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
            {nickNameLoading && (
              <STYLE.LoaderContainer>
                <STYLE.Loader />
              </STYLE.LoaderContainer>
            )}
          </STYLE.ResultList>
        </STYLE.Slider>
      </STYLE.SliderWrapper>

      {/* 탭 버튼 */}
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

      {/* 트래킹 이미지 클릭 모달 */}
      {isTrackingImageModalOpen && (
        <STYLE.ModalOverlay onClick={IsTrackingImageModalToggle}>
          <STYLE.ModalContent onClick={(e) => e.stopPropagation()}>
            <STYLE.CloseButton onClick={IsTrackingImageModalToggle}>
              &times;
            </STYLE.CloseButton>
            <STYLE.TrackingModalList>
              <TrackingImagePostList
                trackingImageList={searchDataSearchpoint}
                hasMoreContent={searchPointHasMoreContent}
                observeRef={observeRef}
              />
            </STYLE.TrackingModalList>
          </STYLE.ModalContent>
        </STYLE.ModalOverlay>
      )}
    </>
  );
};

export default SearchResult;
