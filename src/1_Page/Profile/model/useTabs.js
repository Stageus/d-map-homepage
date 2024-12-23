import { useState } from "react";

const useTabs = (initialTab = "공유", trackShareData, trackSaveData) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tabIndex, setTabIndex] = useState(initialTab === "공유" ? 0 : 1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabIndex(tab === "공유" ? 0 : 1);
  };

  return {
    activeTab,
    tabIndex,
    handleTabClick,
  };
};

export default useTabs;
