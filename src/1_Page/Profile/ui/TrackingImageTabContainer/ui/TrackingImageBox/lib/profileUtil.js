// idx를 기준으로 오름차순 정렬
export const sortTrackData = (data) => {
  return data.sort((a, b) => b.idx - a.idx);
};

export const moveTrack = (track, fromList, toList, sharingStatus) => ({
  updatedFrom: fromList.filter((item) => item.idx !== track.idx),
  updatedTo: [...toList, { ...track, sharing: sharingStatus }],
});
