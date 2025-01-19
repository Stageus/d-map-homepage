import { useState } from "react";
import TABS from "../constant/TABS";

const useTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.LOCATION);

  const handleTabName = () => setActiveTab(TABS.NAME);
  const handleTabLocation = () => setActiveTab(TABS.LOCATION);

  const handleGetPresentTab = (selectTab) => activeTab === selectTab;

  return { activeTab, handleTabName, handleTabLocation, handleGetPresentTab };
};

export default useTab;
