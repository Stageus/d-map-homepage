const useUpdateTrackingImage = () => {
  const [changeTrackingLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });
  // 삭제 트리거 감지 및 처리
  const idxList = modifyIdxList.map((item) => item.idx);
  handleDeleteTrack(idxList);
  deleteTrackingImage(idxList);

  // 수정 트리거 감지 및 처리
  const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
  if (idxToShare.length > 0) putTrackingImageToShare(idxToShare);
  if (idxToNotShare.length > 0) putTrackingImageToNotShare(idxToNotShare);
  handleModifyTrack(idxToShare, idxToNotShare);

  // 선택 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(memorizedTrackData);
  };

  // 트래킹 데이터 수정
  const handleModifyTrack = (idxToShare, idxToNotShare) => {
    setModifyIdxList([]);
    setMemorizedTrackData(trackData);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, idxToShare, idxToNotShare)
    );
  };

  // 트래킹 데이터 삭제
  const handleDeleteTrack = (idxList) => {
    deleteTrackingImage(idxList);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, [], idxList)
    );
    setTrackData((prev) => filterTrackData(prev, modifyIdxList));
    setMemorizedTrackData(trackData);
    setModifyIdxList([]);
  };
};
