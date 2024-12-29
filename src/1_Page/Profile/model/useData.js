import { useEffect, useState } from "react";

const useData = (data) => {
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    if (!data.message) return;
    setTrackData(data.message);
  }, [data]);
  // 데이터 변경 취소
  const handleCancel = () => {
    setTrackData(data.message);
  };

  const handleAnotherType = (track) => {
    setTrackData((prevData) =>
      prevData.map((item) =>
        item === track ? { ...item, sharing: item.sharing === 1 ? 0 : 1 } : item
      )
    );
  };

  return {
    trackData,
    handleAnotherType,
    handleCancel,
  };
};

export default useData;
