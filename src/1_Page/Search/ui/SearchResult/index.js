import React from "react";
import STYLE from "./style";
import StaticTrackingImage from "../../../../2_Widget/StaticTrackingImage";
import empty_profile_icon from "./assets/empty_profile_icon.svg";

import useTab from "./model/useTab";
import useNavigateHandler from "./model/useNavigateHandler";
import useInfinityScroll from "./model/useInfinityScroll";
import useManageSearchData from "./model/useManageSearchData";
import useModalHandler from "../../../../4_Shared/model/useModalHandler";
import TrackingImagePostList from "../../../../2_Widget/TrackingImagePostList";

const SearchResult = () => {
  const { activeTab, handleTabName, handleTabLocation } = useTab(); // 탭 관리
  const {
    page,
    searchPointObserveRef,
    nicknameObserveRef,
    searchPointModalObserveRef,
  } = useInfinityScroll(activeTab);

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
        <STYLE.Slider $tabIndex={activeTab === "nickname"}>
          {/* 장소 탭 */}
          <STYLE.ResultList>
            {searchDataSearchpoint?.length === 0 ? (
              <STYLE.EmptyMessage>없는 장소입니다.</STYLE.EmptyMessage>
            ) : (
              searchDataSearchpoint?.map((result, index) => (
                <STYLE.MapPreview
                  ref={
                    index === searchDataNicnkname.length - 1 &&
                    searchPointHasMoreContent
                      ? searchPointObserveRef
                      : null
                  }
                  key={result.idx}
                  onClick={IsTrackingImageModalToggle}>
                  <STYLE.TitleContainer>
                    <STYLE.ProfileIcon
                      src={result.img_url ? result.img_url : empty_profile_icon}
                    />
                    <STYLE.Title>
                      {result.nickname} - {result.searchpoint}
                    </STYLE.Title>
                  </STYLE.TitleContainer>
                  <STYLE.TrackingImageWrapper>
                    <StaticTrackingImage
                      height=" 100%"
                      mapInfo={{ ...result, draggable: false }}
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
          <STYLE.ResultList>
            {searchDataNicnkname?.length === 0 ? (
              <STYLE.EmptyMessage>없는 이름입니다.</STYLE.EmptyMessage>
            ) : (
              searchDataNicnkname?.map((result, index) => (
                <STYLE.NicckNameContainer
                  key={result.idx}
                  ref={
                    index === searchDataNicnkname.length - 1 &&
                    nicknameHasMoreContent
                      ? nicknameObserveRef
                      : null
                  }
                  onClick={() => {
                    handleNavigate(result.idx);
                  }}>
                  <STYLE.ProfileIcon
                    src={result.img_url ? result.img_url : empty_profile_icon}
                  />
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
                observeRef={searchPointModalObserveRef}
              />
            </STYLE.TrackingModalList>
          </STYLE.ModalContent>
        </STYLE.ModalOverlay>
      )}
    </>
  );
};

export default SearchResult;
