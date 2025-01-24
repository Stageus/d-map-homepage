import { useCallback, useEffect, useState } from "react";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";

const useDeleteTrackData = (
  modifyIdxList,
  setModifyIdxList,
  setTrackData,
  handleSelectCancel,
  showErrorModal
) => {
  const [clickDelete, setClickDelete] = useState(false);

  const deleteClick = useCallback(() => {
    setClickDelete(true);
  }, []);
  useEffect(() => {
    if (!clickDelete) return;
    const deleteAction = async () => {
      await handleDeleteTrack();
      setClickDelete(false); // 실행 후 상태 초기화
    };
    deleteAction();
  }, [clickDelete]);

  // 데이터 삭제
  const handleDeleteTrack = useCallback(async () => {
    const idxList = modifyIdxList.map((item) => item.idx);
    const result = await deleteTrackingImage(idxList);

    if (result === true) {
      setTrackData((prev) =>
        prev.filter(({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx))
      );
      setModifyIdxList([]);
      return;
    }
    showErrorModal(result);
    handleSelectCancel();
  }, [modifyIdxList, handleSelectCancel]);
  return { deleteClick };
};

export default useDeleteTrackData;
