import { useState } from "react";

const useTab = () => {
  const [activeTab, setActiveTab] = useState("화이트");
  const handleTabWhite = () => setActiveTab("화이트");
  const handleTabDark = () => setActiveTab("다크");
  const isPresentTab = (selectTab) => activeTab === selectTab;
  return { activeTab, handleTabWhite, handleTabDark, isPresentTab };
};
export default useTab;
