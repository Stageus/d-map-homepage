import { useState, useCallback, useEffect } from "react";
import useTrackData from "../api/useTrackingList";

const useProfile = () => {
  const [activeTab, setActiveTab] = useState("공유");
  const [tabIndex, setTabIndex] = useState(0);
  const [checkSetMode, setCheckSetMode] = useState(false);
  const [isModal, setIsModalOpen] = useState(false);
  const { trackShareData, trackSaveData, trackLoading, trackError, fetchData } =
    useTrackData();

  const [modifyModal, setModifyModal] = useState(false);

  const [author, setAuthor] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabIndex(tab === "공유" ? 0 : 1);
  };

  const handleGetLength = (tab) => {
    return tab === "공유" ? trackShareData?.length : trackSaveData?.length;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalMode = (type) => {
    setCheckSetMode(type);
  };

  const handleCloseMode = () => {
    setCheckSetMode(false);
  };

  const handleModifyClose = () => {
    setModifyModal(false);
  };
  const handleModifyOpen = () => {
    setModifyModal(true);
  };

  return {
    activeTab,
    tabIndex,
    checkSetMode,
    isModal,
    author,
    trackShareData,
    trackSaveData,
    trackLoading,
    trackError,
    handleTabClick,
    handleGetLength,
    handleModalClose,
    handleModalOpen,
    handleModalMode,
    handleCloseMode,
    setIsModalOpen,
    fetchData,
    modifyModal,
    handleModifyClose,
    handleModifyOpen,
  };
};

export default useProfile;
