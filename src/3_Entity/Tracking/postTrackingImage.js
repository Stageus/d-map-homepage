import searchpointConverter from "../../4_Shared/lib/searchpointConverter";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const postTrackingImage = async (trackingData) => {
  try {
    console.log("Test")
    const searchpoint = await searchpointConverter(trackingData.center);
    const response = await fetchRequest(
      "POST",
      `${BASE_URL}/tracking`,
      {
        line: trackingData?.line,
        searchpoint,
        center: trackingData?.center,
        zoom: trackingData?.zoom,
        heading: trackingData?.heading,
        sharing: trackingData?.sharing,
        color: trackingData?.color,
        thickness: trackingData?.thickness,
        background: trackingData?.background,
      },
      TEST_TOKEN
    );
    const data = await response.json();
    switch (response.status) {
      case 200:
        break;
      case 400:
      case 401:
      case 403:
      case 404:
      case 429:
      case 500:
      default:
        console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
export default postTrackingImage;
