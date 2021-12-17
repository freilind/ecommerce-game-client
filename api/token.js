import jwtDecode from "jwt-decode";
import { TOKEN } from "../utils/constants";

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const hasExpiredToken = (token) => {
  const tokenDecode = jwtDecode(token);
  const expiredDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expiredDate) {
    return true;
  }
  return false;
};
