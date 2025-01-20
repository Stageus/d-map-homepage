const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(currentLocation); // 위치 데이터를 반환
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error); // 에러를 반환
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export default getCurrentLocation;
