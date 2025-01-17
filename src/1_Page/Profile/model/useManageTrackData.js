import { useEffect, useState, useCallback } from "react";
import getTrackData from "../../../3_Entity/Tracking/getTrackData";
import useModifySharingTracking from "../../../3_Entity/Profile/useModifySharingTracking";
import useDeleteTrackingImage from "../../../3_Entity/Profile/useDeleteTrackingImage";

const useManageTrackData = (userIdx) => {
  const [page, setPage] = useState(1);
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const { modifySharing } = useModifySharingTracking(); // 수정 API
  const { deleteTrackingImage } = useDeleteTrackingImage(); // 삭제 API

  // 데이터 호출 함수
  const fetchTrackData = useCallback(async () => {
    try {
      const track = await getTrackData(userIdx, page);
      setTrackData(track || []);
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    }
  }, [userIdx, page]);

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    if (userIdx) {
      fetchTrackData();
    }
  }, [fetchTrackData, userIdx]);

  // 페이지 증가 함수
  const handleNextPage = () => setPage((prev) => prev + 1);

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
    fetchTrackData();
  };

  // 데이터 상태 변경 (수정)
  const handleToggleTrackType = (track) => {
    handleDeleteAdd(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item.idx === track.idx
          ? { ...item, sharing: item.sharing === 1 ? 0 : 1 }
          : item
      )
    );
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteTrack = async () => {
    try {
      await deleteTrackingImage(modifyIdxList);
      setModifyIdxList([]);
      fetchTrackData();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  // 수정 버튼 클릭 처리
  const handleModifyTrack = async () => {
    try {
      await modifySharing(modifyIdxList);
      setModifyIdxList([]);
      fetchTrackData();
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(trackData);
  }, [trackData]);

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
