import axios from "axios";
import axiosToken from "../axiosConfig";
import { getSession } from "next-auth/react";

export const fetchUserFavorites = async (userID: string | undefined): Promise<string[]> => {
  try {
    // Ensure that userID is defined before making the request
    if (userID) {
      const res = await axios.get(`http://localhost:5000/api/user/card-favorite/${userID}`);
      return res.data.favorites || [];
    } else {
      // If userID is not defined, return an empty array
      return [];
    }
  } catch (error) {
    throw new Error(`Error fetching user favorites: ${error}`);
  }
};

export const saveFavoriteProperty = async (estateID: string) => {
  const session = await getSession();
  const userID = session?.user.userID;

  try {
    await axiosToken.post('http://localhost:5000/api/user/save-favorite', {
      estateID,
      userID,
    });

    return;
  } catch (error) {
    throw error; 
  }
};

export const removeFavoriteProperty = async (estateID: string) => {
  const session = await getSession();
  const userID = session?.user.userID;

  try {
    await axiosToken.delete('http://localhost:5000/api/user/remove-favorite', {
      data: { estateID, userID },
    });

    return;
  } catch (error) {
    throw error; 
  }
};