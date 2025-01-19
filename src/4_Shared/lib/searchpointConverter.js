const searchpointConverter = async (center) => {
  const geocoder = new window.google.maps.Geocoder();
  const { lat, lng } = center;

  try {
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results && response.results[0]) {
      let formattedAddress = response.results[0].formatted_address;
      console.log(formattedAddress)
      return formattedAddress; // 수정된 주소 반환
    } else {
      console.log("주소를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("Geocoder 실패:", error);
    throw new Error(`Geocoder 실패: ${error}`);
  }
};

export default searchpointConverter;
