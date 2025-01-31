import { useCallback, useState } from "react";

const TAB_CONFIG = ["공개", "비공개"];

const useTabs = (initialTab = "공개") => {
  const [tabState, setTabState] = useState({
    activeTabStr: initialTab,
    tabIndex: TAB_CONFIG.indexOf(initialTab),
  });

  const handleTabClick = useCallback((tab) => {
    if (!TAB_CONFIG.includes(tab)) {
      return;
    }
    setTabState({
      activeTabStr: tab,
      tabIndex: TAB_CONFIG.indexOf(tab),
    });
  }, []);

  return [tabState, handleTabClick];
};

export default useTabs;
