import { useCallback, useEffect, useState } from "react";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";

const useModifyTrackData = (
  modifyIdxList,
  setModifyIdxList,
  showErrorModal,
  handleSelectCancel,
  sortTrackData
) => {
  const [clickModify, setClickModify] = useState(false);
  const modifyClick = useCallback(() => {
    setClickModify(true);
  }, []);
  useEffect(() => {
    if (!clickModify) return;
    const deleteAction = async () => {
      await handleModifyTrack();
      setClickModify(false); // 실행 후 상태 초기화
    };
    deleteAction();
  }, [clickModify]);

  const [changeSaveTrackingLength, setChangeSaveTrackingLength] = useState(0);
  const [changeShareTrackingLength, setChangeShareTrackingLength] = useState(0);

  const handleModifyTrack = useCallback(async () => {
    const idxToShare = modifyIdxList
      .filter((item) => !item.sharing)
      .map((item) => item.idx);
    const idxToNotShare = modifyIdxList
      .filter((item) => item.sharing)
      .map((item) => item.idx);
    const resultToShare = await putTrackingToShare(idxToShare);
    const resultToNotShare = await putTrackingToNotShare(idxToNotShare);
    if (resultToShare === true && resultToNotShare === true) {
      setModifyIdxList([]);
      setChangeShareTrackingLength((pre) => pre + idxToNotShare.length);
      setChangeSaveTrackingLength((pre) => pre + idxToShare.length);
      sortTrackData();
      return;
    }
    showErrorModal(resultToShare !== true ? resultToShare : resultToNotShare);
    handleSelectCancel();
  }, [modifyIdxList, sortTrackData, handleSelectCancel]);
  return { modifyClick, changeSaveTrackingLength, changeShareTrackingLength };
};
export default useModifyTrackData;
