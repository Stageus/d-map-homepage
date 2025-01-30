import React from "react";
import { useParams } from "react-router-dom";
import STYLE from "./style";

import Header from "./ui/Header";
import ModifyModeHeader from "./ui/ModifyModeHeader";
import useGetUserInfo from "../../../../3_Entity/Account/useGetUserInfo";

const ProfileHeader = (props) => {
  const {
    activeTabStr,
    handleSetMode,
    handleTabClick,
    modifyMode,
    handleCloseMode,
    modifyIdxList,
    setDisplayTrackingImage,
    setModifyIdxList,
    backupTrackingImageData,
  } = props;

  const { userIdx } = useParams();
  const [userInfo, loading, fetchUserInfo] = useGetUserInfo(userIdx);

  return (
    <>
      {modifyMode ? (
        <ModifyModeHeader
          modifyMode={modifyMode}
          handleCloseMode={handleCloseMode}
          modifyIdxList={modifyIdxList}
          setDisplayTrackingImage={setDisplayTrackingImage}
          setModifyIdxList={setModifyIdxList}
          backupTrackingImageData={backupTrackingImageData}
          fetchUserInfo={fetchUserInfo}
        />
      ) : (
        <Header
          userInfo={userInfo}
          activeTabStr={activeTabStr}
          handleSetMode={handleSetMode}
          fetchUserInfo={fetchUserInfo}
        />
      )}

      <STYLE.TabMenu>
        {userInfo?.isMine ? (
          <>
            <STYLE.Tab
              $active={activeTabStr === "공유"}
              onClick={() => handleTabClick("공유")}>
              공유
            </STYLE.Tab>
            <STYLE.Tab
              $active={activeTabStr === "저장"}
              onClick={() => handleTabClick("저장")}>
              저장
            </STYLE.Tab>
          </>
        ) : (
          <STYLE.TabNone>게시물</STYLE.TabNone>
        )}
      </STYLE.TabMenu>
    </>
  );
};
export default React.memo(ProfileHeader);
