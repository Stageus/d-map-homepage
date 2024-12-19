import { useEffect, useState } from "react";
import useTrackData from "../api/useTrackingList";

const useProfile = () => {
  const [activeTab, setActiveTab] = useState("공유");
  const [tabIndex, setTabIndex] = useState(0);
  const [checkSetMode, setCheckSetMode] = useState(false);
  const [isModal, setIsModalOpen] = useState(false);
  const { trackShareData, trackSaveData, trackLoading, trackError, fetchData } =
    useTrackData();

  const [author, setAuthor] = useState(true);

  useEffect(() => {
    fetchData("idx");
  }, [fetchData]);

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

  const handleModalMode = (type) => {
    setCheckSetMode(type);
  };

  const handleCloseMode = () => {
    setCheckSetMode(false);
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
    handleModalMode,
    handleCloseMode,
    setIsModalOpen,
  };
};

export default useProfile;
