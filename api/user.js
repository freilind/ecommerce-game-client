import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const registerApi = async (formData) => {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginApi = async (formData) => {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPasswordApi = async (email) => {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMeApi = async (logout) => {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};
