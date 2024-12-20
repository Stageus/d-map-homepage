import { useState } from "react";

const useTabs = (initialTab = "공유") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tabIndex, setTabIndex] = useState(initialTab === "공유" ? 0 : 1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabIndex(tab === "공유" ? 0 : 1);
  };

  const handleGetLength = (tab, trackShareData, trackSaveData) => {
    return tab === "공유" ? trackShareData?.length : trackSaveData?.length;
  };

  return {
    activeTab,
    tabIndex,
    handleTabClick,
    handleGetLength,
  };
};

export default useTabs;
