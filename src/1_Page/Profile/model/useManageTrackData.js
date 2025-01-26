import { useState, useCallback, useEffect, useRef } from "react";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";

const useManageTrackData = (
  trackingImageData,
  tabIndex,
  checkLessLength,
  showErrorModal
) => {
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [changeSaveTrackingLength, setChangeSaveTrackingLength] = useState(0);
  const [changeShareTrackingLength, setChangeShareTrackingLength] = useState(0);
  useEffect(() => {
    console.log(changeSaveTrackingLength);
  }, [changeSaveTrackingLength]);
  const prevLength = useRef(null);

  useEffect(() => {
    setTrackData((prev) => {
      const newItems = trackingImageData.filter(
        (item) => !prev.some((prevItem) => prevItem.idx === item.idx)
      );
      return [...prev, ...newItems];
    });
    removeDuplicateData();
  }, [trackingImageData]);

  const shareTrackingImageData = trackData.filter((item) => item.sharing);
  const saveTrackingImageData = trackData.filter((item) => !item.sharing);

  useEffect(() => {
    const currentTrackData =
      tabIndex === 0 ? shareTrackingImageData : saveTrackingImageData;
    if (currentTrackData.length === 0) return;

    if (currentTrackData.length !== prevLength.current) {
      checkLessLength(currentTrackData.length);
      prevLength.current = currentTrackData.length;
    }
  }, [
    shareTrackingImageData,
    saveTrackingImageData,
    tabIndex,
    checkLessLength,
  ]);

  const sortTrackData = useCallback(() => {
    setTrackData((prev) => [...prev].sort((a, b) => b.idx - a.idx));
  }, []);

  // 중복 데이터 제거
  const removeDuplicateData = useCallback(() => {
    setTrackData((prev) => {
      const uniqueData = prev.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.idx === item.idx)
      );
      return uniqueData;
    });
  }, []);

  // 선택된 데이터 한번 클릭시 추가 두번 클릭시 삭제
  const toggleModifyIdxList = useCallback((track) => {
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  }, []);

  // 선택 초기화
  const handleSelectCancel = useCallback(() => {
    setModifyIdxList([]);
    setTrackData(trackingImageData || []);
  }, [trackingImageData]);

  // 데이터 선택
  const handleAddModifyIdxList = useCallback(
    (track, isDelete = false) => {
      toggleModifyIdxList(track);

      // 수정인 경우 toggle
      if (isDelete) return;
      setTrackData((prev) =>
        prev.map((item) =>
          item.idx === track.idx ? { ...item, sharing: !item.sharing } : item
        )
      );
      sortTrackData();
      removeDuplicateData();
    },
    [toggleModifyIdxList, sortTrackData, removeDuplicateData]
  );

  // 데이터 삭제
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

    const shareToDeleteCount = modifyIdxList.filter(
      (item) => item.sharing === true
    ).length;
    const saveToDeleteCount = modifyIdxList.filter(
      (item) => item.sharing === true
    ).length;
    if (result === true) {
      setChangeShareTrackingLength((pre) => pre + shareToDeleteCount);
      setChangeSaveTrackingLength((pre) => pre + saveToDeleteCount);
      setTrackData((prev) =>
        prev.filter(({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx))
      );
      setModifyIdxList([]);
      return;
    }
    showErrorModal(result);
    handleSelectCancel();
  }, [modifyIdxList, handleSelectCancel]);

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
      setChangeShareTrackingLength(
        (pre) => pre + idxToNotShare.length - idxToShare.length
      );
      setChangeSaveTrackingLength(
        (pre) => pre + idxToShare.length - idxToNotShare.length
      );
      sortTrackData();
      return;
    }
    showErrorModal(resultToShare !== true ? resultToShare : resultToNotShare);
    handleSelectCancel();
  }, [modifyIdxList, sortTrackData, handleSelectCancel]);

  return {
    deleteClick,
    modifyClick,
    modifyIdxList,
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    changeShareTrackingLength,
    changeSaveTrackingLength,
  };
};

export default useManageTrackData;
