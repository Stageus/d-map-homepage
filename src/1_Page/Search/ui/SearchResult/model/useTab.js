import { useState } from "react";

const useTab = () => {
  const [activeTab, setActiveTab] = useState("이름");
  const handleTabName = () => setActiveTab("이름");
  const handleTabLocation = () => setActiveTab("장소");
  const handleGetPresentTab = (selectTab) => activeTab === selectTab;
  return { activeTab, handleTabName, handleTabLocation, handleGetPresentTab };
};
export default useTab;
