import { useState, useEffect } from "react";
import { saveFavoriteProperty, removeFavoriteProperty } from "@/api"; // Import your API functions

const CardProperty = ({ data, userData }: any) => {
  // ... (other code)

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // You might want to fetch the initial favorite status from the API here
    // and update the isFavorite state accordingly.
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // If it's already a favorite, remove it
        await removeFavoriteProperty(data.head.estateID);
      } else {
        // If it's not a favorite, add it
        await saveFavoriteProperty(data.head.estateID);
      }

      // Update the local state after successful API call
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Handle error appropriately, perhaps show a notification to the user
    }
  };

  // ... (other code)

  return (
    // ... (JSX code)
  );
};

export default CardProperty;
