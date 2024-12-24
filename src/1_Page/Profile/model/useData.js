import { useState, useEffect } from "react";

const useData = (trackShareData, trackSaveData, modifyMode) => {
  const [shareData, setShareData] = useState(null);
  const [saveData, setSaveData] = useState(null);

  const [initialShareData, setInitialShareData] = useState([]);
  const [initialSaveData, setInitialSaveData] = useState([]);

  // API 데이터를 상태로 설정
  useEffect(() => {
    if (trackShareData) setShareData(trackShareData);
    if (trackSaveData) setSaveData(trackSaveData);
  }, [trackShareData, trackSaveData]);

  useEffect(() => {
    if (!modifyMode) return;
    setInitialShareData(shareData);
    setInitialSaveData(saveData);
  }, [modifyMode, shareData, saveData]);

  const handleCancel = () => {
    setShareData(initialShareData);
    setSaveData(initialSaveData);
  };

  return {
    shareData,
    saveData,
    setShareData,
    setSaveData,
    handleCancel,
  };
};

export default useData;
