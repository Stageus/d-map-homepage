export const sharedPosts = {
  message: [
    ...Array.from({ length: 40 }, (_, idx) => ({
      idx: 100 + idx,
      line: [
        [
          { lat: 37.57, lng: 126.97 },
          { lat: 37.5705 + idx * 0.001, lng: 126.975 },
          { lat: 37.5715 + idx * 0.001, lng: 126.9741 },
          { lat: 37.572 + idx * 0.001, lng: 126.969 },
          { lat: 37.571 - idx * 0.001, lng: 126.964 },
          { lat: 37.57, lng: 126.97 },
        ],
        [
          { lat: 37.57, lng: 126.97 },
          { lat: 37.571 + idx * 0.001, lng: 126.975 },
          { lat: 37.572 + idx * 0.001, lng: 126.97 },
          { lat: 37.57, lng: 126.97 },
        ],
        [
          { lat: 37.57, lng: 126.97 },
          { lat: 37.57, lng: 126.975 },
          { lat: 37.571, lng: 126.975 },
          { lat: 37.571, lng: 126.97 },
          { lat: 37.57, lng: 126.97 },
        ],
      ],
      searchpoint: `위치 ${idx + 1}`,
      center: { lat: 37.57 + idx * 0.001, lng: 126.97 },
      zoom: 14 + (idx % 3),
      heading: 250 + idx,
      sharing: idx % 2,
      likecount: 100 + idx * 10,
      color: idx % 3,
      thickness: 10 + idx,
      background: idx % 2,
    })),
  ],
};
