const useHandleCancle = () => {
  // 초기 상태 저장
  const [initialShareData, setInitialShareData] = useState([]);
  const [initialSaveData, setInitialSaveData] = useState([]);

  useEffect(() => {
    if (!modifyMode) return;
    setInitialShareData(shareData);
    setInitialSaveData(saveData);
  }, [modifyMode, trackShareData, trackSaveData]);

  const handleCancel = () => {
    setShareData(initialShareData);
    setSaveData(initialSaveData);
  };
};
