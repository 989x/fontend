import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supportedTypeMap } from "@/lib/types/propertyMappings";
import { useDictionary } from "@/lib/dictionary";
import { saveFavoriteProperty, removeFavoriteProperty } from "@/lib/api/favorites";

const CardProperty = ({ data, userData, favorites }: any) => {
  const t = useDictionary();
  const updatedAt = new Date(data.head.updatedAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - updatedAt.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  // const isSupporter =
  //   supportedTypeMap.some((sub) => data.user?.subs?.type.includes(sub.value)) ||
  //   supportedTypeMap.some((sub) => userData?.subs?.type.includes(sub.value));
  const isSupporter = [
    data.user?.subs?.type,
    userData?.subs?.type,
  ].some((sub) => supportedTypeMap.includes(sub));

  const isPropertyFavorite = favorites?.includes(data._id);
  const [isFavorite, setIsFavorite] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ________________________________________ favorites 

  // useEffect(() => {
  //   // Check if the property is in the favorites array
  //   const isPropertyFavorite = favorites?.includes(data._id);
  //   setIsFavorite(isPropertyFavorite);
  // }, [data._id, favorites]);
  useEffect(() => {
    setIsFavorite(isPropertyFavorite);
  }, [isPropertyFavorite]);
  
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
    }
  };

  // ________________________________________ image 

  // Function to disable links
  const disableLink = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="w-full" title={data.desc.title}>
      <div className="text-sm font-medium text-gray-600 mb-2">
        {data.user?.info?.name
          ? `${t.CardPropertyBy} ${data.user.info.name}`
          : userData
          ? `${t.CardPropertyBy} ${userData.info.name}`
          : "Property information not available"}
      </div>

      <Link href={`/property/${data.head.estateID}`}>
        <div className="shadow rounded-md group">
          <div className="flex justify-center relative rounded-t-md overflow-hidden h-[260px] lg:h-[280px]">
            <Image
              src={data.desc.images[currentImageIndex]}
              alt={`${data.head.estateID}+${data.desc.images[0]}`}
              height={0}
              width={600}
              style={{ height: "auto", width: "100%", objectFit: "cover" }}
            />
            <div className="absolute top-2 left-2 text-sm font-semibold flex gap-1.5 items-center">
              {daysDifference <= 7 && (
                <div className="flex py-1 px-2 items-center bg-white border rounded-md">
                  <span className="text-blue-600">{t.CardPropertyNew}</span>
                </div>
              )}
              {isSupporter && (
                <div className="flex py-1 px-2 items-center bg-white border rounded-md">
                  <span className="text-gray-600">
                    {t.CardPropertySupporter}
                  </span>
                </div>
              )}
            </div>
            <button 
              className="absolute top-2 right-2" 
              onClick={toggleFavorite} 
              onClickCapture={disableLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-[34px] h-[34px] ${isFavorite ? 'text-gray-100 opacity-100' : 'text-gray-200 opacity-80'}`}
              >
                <path
                  fill={isFavorite ? "#FF6600" : "#ffffff"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProperty;
