import { useState, useEffect } from "react";

const useData = (trackShareData, trackSaveData, modifyMode) => {
  const [shareData, setShareData] = useState(null);
  const [saveData, setSaveData] = useState(null);

  const [initialShareData, setInitialShareData] = useState([]);
  const [initialSaveData, setInitialSaveData] = useState([]);

  // API 데이터를 초기 상태로 설정
  useEffect(() => {
    if (trackShareData) setShareData(trackShareData);
    if (trackSaveData) setSaveData(trackSaveData);
  }, [trackShareData, trackSaveData]);

  // 모드가 바뀔때 현재 데이터를 저장
  useEffect(() => {
    if (!modifyMode) return;
    setInitialShareData(shareData);
    setInitialSaveData(saveData);
  }, [modifyMode, shareData, saveData]);

  // 데이터 변경 취소
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
