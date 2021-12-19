import { BASE_PATH } from "../utils/constants";

export const getPlatformsApi = async () => {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:asc`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
