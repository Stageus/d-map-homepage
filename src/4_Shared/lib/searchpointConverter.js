const searchpointConverter = async (center) => {
  const geocoder = new window.google.maps.Geocoder();
  const { lat, lng } = center;

  try {
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results && response.results[0]) {
      let formattedAddress = response.results[0].formatted_address;
      
      // Plus Code 제거하는 정규식
      const plusCodePattern = /[A-Z0-9]{4}\+[A-Z0-9]{2}(?:\s*[\w\s]+)*$/;
      
      // 주소에서 Plus Code 부분을 제거
      formattedAddress = formattedAddress.replace(plusCodePattern, '').trim();

      console.log(formattedAddress); // 수정된 주소 출력
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
