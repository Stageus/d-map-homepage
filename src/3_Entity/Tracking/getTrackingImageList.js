import { fetchRequest } from "../../4_Shared/util/apiUtil";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const getTrackingImageList = async (userIdx, page, sharing) => {
  if (!userIdx) return;
  try {
    const endpoint = `${BASE_URL}/tracking/account/${userIdx}?page=${page}&category=${sharing}`;
    const response = await fetchRequest("GET", endpoint, null, TEST_TOKEN);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`서버 애러: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tracking image list:", error);
  }
};

export default getTrackingImageList;
