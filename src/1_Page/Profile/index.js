import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";
import useInfinityScroll from "./model/useInfinityScroll.js";
import useGetUserInfo from "./model/useGetUserInfo";

import useGetTrackingImageList from "./model/useGetTrackingImageList.js";
import ConfirmModal from "../../2_Widget/ConfirmModal";
import useErrorModal from "./model/useModalHandler.js";
import useDeleteTrackData from "./model/useDeleteTrackData.js";
import useModifyTrackData from "./model/useModifyTrackData.js";

const Profile = () => {
  const { tabState, handleTabClick } = useTabs(); // 탭 관리 훅
  const { modifyMode, memoizedSetMode } = useSettingMode(); // 수정 , 삭제 상태 관리
  const { paging, handleScroll, checkLessLength, handleNextPage } =
    useInfinityScroll(tabState.tabIndex);

  const { errorMessage, isModalOpen, showErrorModal, errorModalBackPage } =
    useErrorModal(); // 에러 표시 모달

  // 유저 데이터 조회
  const { memoizedUserInfoData } = useGetUserInfo(showErrorModal);

  // 데이터 조회 (userIdx , page , category)
  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(
      memoizedUserInfoData?.idx,
      paging,
      tabState.tabIndex === 1 ? 0 : 1 // 0 이 공유 , 1이 저장
    );

  // 데이터 관리 훅 ( 수정 , 삭제 , 취소)
  const {
    setTrackData,
    modifyIdxList,
    setModifyIdxList,
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    sortTrackData,
  } = useManageTrackData(trackingImageList, tabState.tabIndex, checkLessLength);

  const { deleteClick } = useDeleteTrackData(
    modifyIdxList,
    setModifyIdxList,
    setTrackData,
    handleSelectCancel,
    showErrorModal
  );

  const { modifyClick, changeSaveTrackingLength, changeShareTrackingLength } =
    useModifyTrackData(
      modifyIdxList,
      setModifyIdxList,
      showErrorModal,
      handleSelectCancel,
      sortTrackData
    );

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={memoizedSetMode}
          deleteClick={deleteClick}
          modifyClick={modifyClick}
          activeTabStr={tabState?.activeTabStr}
          handleTabClick={handleTabClick}
          handleSelectCancel={handleSelectCancel}
          userInfoData={memoizedUserInfoData}
          changeShareTrackingLength={changeShareTrackingLength}
          changeSaveTrackingLength={changeSaveTrackingLength}
          isModifyListEmpty={modifyIdxList.length === 0}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              trackingImageList={shareTrackingImageData}
              modifyMode={modifyMode}
              hasMoreContent={hasMoreContent.share}
              handleNextPage={handleNextPage}
              handleScroll={hasMoreContent.share ? handleScroll : null}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
            <TrackingImageTab
              trackingImageList={saveTrackingImageData}
              modifyMode={modifyMode}
              handleNextPage={handleNextPage}
              hasMoreContent={hasMoreContent.save}
              handleScroll={hasMoreContent.save ? handleScroll : null}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>

      {loading && (
        <STYLE.LoadingContainer>
          <STYLE.LoadingBox>
            <STYLE.Loading />
          </STYLE.LoadingBox>
        </STYLE.LoadingContainer>
      )}

      {isModalOpen && (
        <ConfirmModal
          message={errorMessage}
          onClose={errorModalBackPage}
          type="one"
        />
      )}
    </>
  );
};

export default Profile;
