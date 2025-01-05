import { useState } from "react";
import TABS from "../constant/tabs";

const useTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.WHITE);
  const handleTabWhite = () => setActiveTab(TABS.WHITE);
  const handleTabDark = () => setActiveTab(TABS.DARK);
  const isPresentTab = (selectTab) => activeTab === selectTab;
  return { activeTab, handleTabWhite, handleTabDark, isPresentTab };
};
export default useTab;
