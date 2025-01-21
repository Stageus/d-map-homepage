import { useState } from "react";
import TABS from "../../../constant/SEARCH_TYPE";

const useTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.SEARCHPOINT);

  const handleTabName = () => setActiveTab(TABS.NICKNAME);
  const handleTabLocation = () => setActiveTab(TABS.SEARCHPOINT);

  const handleGetPresentTab = (selectTab) => activeTab === selectTab;

  return { activeTab, handleTabName, handleTabLocation, handleGetPresentTab };
};

export default useTab;
