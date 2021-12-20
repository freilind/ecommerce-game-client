import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export const isFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0 || !dataFound) {
      return "You already have this game in your favorites list.";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: idUser, game: idGame }),
      };
      return await authFetch(url, params, logout);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0) {
      const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await authFetch(url, params, logout);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFavoriteApi = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};
