import { moveTrack, sortTrackData } from "../../../../../lib/profileUtil";

const useSelectTrack = (setDisplayTrackingImage, setModifyIdxList) => {
  // 공유 상태 이벤트일 경우 트랙 위치 토글
  const clickTrackEvent = (track, isDelete) => {
    if (!isDelete) {
      setDisplayTrackingImage((prev) => {
        const { save, share } = prev;
        const isInSave = save.some((prevTrack) => prevTrack.idx === track.idx);
        const { updatedFrom, updatedTo } = isInSave
          ? moveTrack(track, save, share, true)
          : moveTrack(track, share, save, false);

        // 정렬 후 새로운 상태 반환
        return isInSave
          ? {
              save: sortTrackData(updatedFrom),
              share: sortTrackData(updatedTo),
            }
          : {
              save: sortTrackData(updatedTo),
              share: sortTrackData(updatedFrom),
            };
      });
    }
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  };
  return [clickTrackEvent];
};
export default useSelectTrack;
