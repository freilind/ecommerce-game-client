import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const createAddressApi = async (address, logout) => {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressesApi = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw new Error("Error from server");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAddressApi = async (idAddress, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw new Error("Error from server");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateAddressApi = async (idAddress, address, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};
