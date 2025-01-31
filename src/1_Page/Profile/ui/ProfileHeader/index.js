import React from "react";
import { useParams } from "react-router-dom";
import STYLE from "./style";

import DefaultHeader from "./ui/DefaultHeader";
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
        <DefaultHeader
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
              $active={activeTabStr === "공개"}
              onClick={() => handleTabClick("공개")}>
              공개
            </STYLE.Tab>
            <STYLE.Tab
              $active={activeTabStr === "비공개"}
              onClick={() => handleTabClick("비공개")}>
              비공개
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
