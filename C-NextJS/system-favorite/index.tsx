import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Pagination from "@/components/tool/Pagination";
import SearchProperties from "@/components/search/SearchProperties";
import Format from "@/components/layout/Format";
import CardProperty from "@/components/card/CardProperty";

interface PropertiesProps {
  estates: any[];
  keyword: any;
  totalRecords: number; 
}

export default function Properties({ estates, keyword, totalRecords }: PropertiesProps) {
  const router = useRouter();

  const { data: session } = useSession();
  const userID = session?.user?.userID;

  const [favorites, setFavorites] = useState<string[]>([]);
  const [estatesData, setEstatesData] = useState<any[] | null>(null);
  
  const [howManyPages, setHowManyPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    setEstatesData(estates);

    const pageSize = 12; // must match nodeJS
    const totalPages = Math.ceil(totalRecords / pageSize);

    setHowManyPages(totalPages);
    // update currentPage based on page parameter
    setCurrentPage(parseInt(router.query.page as string) || 1); 
  }, [estates, totalRecords, router.query.page]);

  // ________________________________________ favorite

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        // Ensure that userID is defined before making the request
        if (userID) {
          const response = await axios.get(`http://localhost:5000/api/user/favorites/${userID}`);
          setFavorites(response.data.favorites || []);
        } else {
          // console.warn("User is not logged in.");
          return;
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    fetchUserFavorites();
  }, [userID]);

  // ________________________________________ page 

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    })
  };

  return (
    <Format title="Discover - Properties">
      {/* filter */}
      <SearchProperties defaultSearch={keyword} />

      {/* search result */}
      
      {/* list content */}
      <div className="flex w-full">
        <div className="grid sm:grid-cols-2 gap-5 w-full h-fit">
          {estatesData.map((data: any, index: number) => {
            return (
              <div key={index}>
                <CardProperty data={data} favorites={favorites} />
              </div>
            );
          })}
        </div>

        {/* PropertiesSidebar */}
      </div>

      {howManyPages > 0 && (
        <Pagination
          pages={howManyPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Format>
  );
}

export async function getServerSideProps({ query }: any) {
  try {
    const {
      keyword,
      findStatus,
      findType,
      minBed,
      minBath,
      minPrice,
      maxPrice,
      sorting,
      page, 
    } = query;
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (findStatus) params.append("findStatus", findStatus);
    if (findType) params.append("findType", findType);
    if (minBed) params.append("minBed", minBed); 
    if (minBath) params.append("minBath", minBath);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (sorting) params.append("sorting", sorting);
    if (page) params.append("page", page); 

    const res = await axios.get(
      `http://localhost:5000/api/estate/search?${params.toString()}`
    );
    const estates = res.data.estates;
    const totalRecords = res.data.totalRecords;

    return { props: { estates, keyword: keyword || null, totalRecords } };
  } catch (error) {
    return { props: { estates: [], keyword: null } };
  }
}
