import { useState, useEffect } from "react";

const useData = (track, modifyMode) => {
  const [data, setData] = useState({
    shareData: null,
    saveData: null,
  });

  const [initData, setInitData] = useState({
    shareData: null,
    saveData: null,
  });

  // API 데이터를 초기 상태로 설정
  useEffect(() => {
    const { share, save } = parseShare(track);
    setData({
      shareData: share,
      saveData: save,
    });
  }, [track]);

  // 모드가 변경될 때 초기 데이터를 저장
  useEffect(() => {
    if (!modifyMode) return;
    console.log({
      shareData: data.shareData,
      saveData: data.saveData,
    });
    setInitData({
      shareData: data.shareData,
      saveData: data.saveData,
    });
  }, [modifyMode]);

  // 데이터 변경 취소
  const handleCancel = () => {
    setData(initData);
  };

  const handleAnotherType = (track) => {
    // 있으면 삭제 없으면 추가
    const updatedShareData = data.shareData.includes(track)
      ? data.shareData.filter((item) => item !== track)
      : [...data.shareData, track];

    const updatedSaveData = data.saveData.includes(track)
      ? data.saveData.filter((item) => item !== track)
      : [...data.saveData, track];
    setData({
      shareData: updatedShareData,
      saveData: updatedSaveData,
    });
  };

  return {
    data,
    handleAnotherType,
    handleCancel,
  };
};

// 데이터 파싱 함수
const parseShare = (data) => {
  if (!data?.message) return { share: [], save: [] };

  const share = data.message.filter((item) => item.sharing === 0);
  const save = data.message.filter((item) => item.sharing === 1);
  return { share, save };
};

export default useData;
