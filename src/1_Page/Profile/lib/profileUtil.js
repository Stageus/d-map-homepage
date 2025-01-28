// 공유 및 비공유 인덱스를 추출하는 유틸리티 함수
export const extractIdxLists = (list) => {
  return list.reduce(
    (acc, item) => {
      if (item.sharing) {
        acc.idxToNotShare.push(item.idx);
      } else {
        acc.idxToShare.push(item.idx);
      }
      return acc;
    },
    { idxToShare: [], idxToNotShare: [] }
  );
};

// 트래킹 길이를 업데이트하는 함수
export const calculateTrackingLength = (prev, idxToShare, idxToNotShare) => ({
  share: prev.share + idxToNotShare.length - idxToShare.length,
  save: prev.save + idxToShare.length - idxToNotShare.length,
});

// 트래킹 데이터를 필터링하는 함수
export const filterTrackData = (prev, modifyIdxList) => {
  const modifyIdxSet = new Set(modifyIdxList.map((mod) => mod.idx));
  return {
    save: prev.save.filter(({ idx }) => !modifyIdxSet.has(idx)),
    share: prev.share.filter(({ idx }) => !modifyIdxSet.has(idx)),
  };
};

// 트래킹 데이터를 공유/비공유 상태로 분류하는 함수
export const categorizeTrackData = (data) => {
  return {
    save: data.filter((item) => !item.sharing), // sharing이 false인 경우
    share: data.filter((item) => item.sharing), // sharing이 true인 경우
  };
};

// 중복 제거 함수
export const removeDuplicateData = (data) => {
  return data.filter(
    (item, index, self) => index === self.findIndex((t) => t.idx === item.idx)
  );
};

// idx를 기준으로 오름차순 정렬
export const sortTrackData = (data) => {
  return data.sort((a, b) => b.idx - a.idx);
};

export const moveTrack = (track, fromList, toList, sharingStatus) => ({
  updatedFrom: fromList.filter((item) => item.idx !== track.idx),
  updatedTo: [...toList, { ...track, sharing: sharingStatus }],
});
