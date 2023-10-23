import axios from "axios";
import axiosToken from "../axiosConfig";
import { getSession } from "next-auth/react";
import { checkExpire1Day } from "./lib/dataExpiration"; // Update the import path as needed

// Function to get user favorites from localStorage
const getUserFavoritesFromLocalStorage = (userID: string): string[] | null => {
  const storedFavorites = localStorage.getItem(`userFavorites_${userID}`);
  if (!storedFavorites) return null;

  const parsedFavorites = JSON.parse(storedFavorites);
  if (parsedFavorites && checkExpire1Day(parsedFavorites.timestamp)) {
    // Data has expired, return null to trigger a fresh API request
    return null;
  }
  return parsedFavorites.data;
};

// Function to save user favorites to localStorage with a timestamp
const setUserFavoritesToLocalStorage = (userID: string, favorites: string[]) => {
  const dataToStore = {
    data: favorites,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(`userFavorites_${userID}`, JSON.stringify(dataToStore));
};

export const fetchUserFavorites = async (userID: string | undefined): Promise<string[]> => {
  if (userID) {
    const storedFavorites = getUserFavoritesFromLocalStorage(userID);

    if (storedFavorites === null) {
      // Data has expired or doesn't exist in localStorage, fetch from the API
      try {
        const res = await axios.get(`http://localhost:5000/api/user/card-favorite/${userID}`);
        const favorites = res.data.favorites || [];
        setUserFavoritesToLocalStorage(userID, favorites);
        return favorites;
      } catch (error) {
        throw new Error(`Error fetching user favorites: ${error}`);
      }
    }

    return storedFavorites;
  }

  return [];
};

export const saveFavoriteProperty = async (estateID: string) => {
  const session = await getSession();
  const userID = session?.user.userID;

  if (userID) {
    try {
      await axiosToken.post('http://localhost:5000/api/user/save-favorite', {
        estateID,
        userID,
      });

      // Update localStorage with the added favorite property
      const storedFavorites = getUserFavoritesFromLocalStorage(userID) || [];
      storedFavorites.push(estateID);
      setUserFavoritesToLocalStorage(userID, storedFavorites);

      return;
    } catch (error) {
      throw error;
    }
  }
};

export const removeFavoriteProperty = async (estateID: string) => {
  const session = await getSession();
  const userID = session?.user.userID;

  if (userID) {
    try {
      await axiosToken.delete('http://localhost:5000/api/user/remove-favorite', {
        data: { estateID, userID },
      });

      // Update localStorage by removing the favorite property
      const storedFavorites = getUserFavoritesFromLocalStorage(userID) || [];
      const updatedFavorites = storedFavorites.filter(id => id !== estateID);
      setUserFavoritesToLocalStorage(userID, updatedFavorites);

      return;
    } catch (error) {
      throw error;
    }
  }
};
