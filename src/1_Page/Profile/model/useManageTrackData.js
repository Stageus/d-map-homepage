import { useEffect, useState, useCallback } from "react";
import useGetTrackingImageList from "../../../3_Entity/Tracking/useGetTrackingImageList";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";
import { useParams } from "react-router-dom";

const useManageTrackData = () => {
  const { userIdx } = useParams();

  const [page, setPage] = useState(1);
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);

  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, page);

  // 초기 데이터 설정
  useEffect(() => {
    setTrackData(trackingImageList);
  }, [trackingImageList]);

  // 페이지 증가 함수
  const handleNextPage = () => {
    if (!hasMoreContent && !loading) return;
    setPage((prev) => prev + 1);
  };

  // 수정 및 삭제 시 선택된 데이터 관리
  const handleDeleteAdd = (track) => {
    setModifyIdxList((prev) =>
      prev.includes(track.idx)
        ? prev.filter((idx) => idx !== track.idx)
        : [...prev, track.idx]
    );
  };

  // 데이터 상태 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(trackingImageList);
  };

  // 데이터 상태 변경 (수정)
  const handleToggleTrackType = (track) => {
    handleDeleteAdd(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item.idx === track.idx
          ? { ...item, sharing: item.sharing === true ? false : true }
          : item
      )
    );
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteTrack = async () => {
    try {
      await deleteTrackingImage(modifyIdxList);
      setModifyIdxList([]);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  // 수정 버튼 클릭 처리
  const handleModifyTrack = async () => {
    try {
      const groupedBySharing = modifyIdxList.reduce(
        (acc, item) => {
          if (item.sharing === false) acc.notShare.push(item);
          if (item.sharing === true) acc.share.push(item);
          return acc;
        },
        { notShare: [], share: [] }
      );
      await putTrackingToShare(groupedBySharing.notShare);
      await putTrackingToNotShare(groupedBySharing.share);
      setModifyIdxList([]);
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
    }
  };

  const getTrackLength = (isShared) =>
    Array.isArray(trackData)
      ? trackData.filter((track) => track.sharing === isShared).length
      : 0;

  return {
    trackData,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleDeleteAdd, // 삭제 항목 추가 (별칭 처리)
    getTrackLength,
    handleNextPage,
  };
};

export default useManageTrackData;
