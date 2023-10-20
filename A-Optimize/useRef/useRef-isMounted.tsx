import { useEffect, useState, useRef } from 'react';

export default function Properties({ estates, keyword, totalRecords }: PropertiesProps) {
  // ... other declarations

  const [favorites, setFavorites] = useState<string[]>([]);
  const [estatesData, setEstatesData] = useState<any[] | null>(null);
  const [sorting, setSorting] = useState("");
  const [howManyPages, setHowManyPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [userSidebar, setUserSidebar] = useState([]);
  const [blogSidebar, setBlogSidebar] = useState<any[]>([]);

  // Use useRef to track whether the component has mounted
  const isMounted = useRef(false);

  useEffect(() => {
    // Check if the component has already mounted
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    console.log("start useEffect setEstatesData");

    setEstatesData(estates);

    const pageSize = 12; // must match nodeJS
    const totalPages = Math.ceil(totalRecords / pageSize);

    setHowManyPages(totalPages);
    // update currentPage based on page parameter
    setCurrentPage(parseInt(router.query.page as string) || 1);

    // Fetch data for PropertiesSidebar here
    fetchDataForPropertiesSidebar();
  }, [estates, totalRecords, router.query.page]);

  // Fetch data for user favorites after the initial rendering
  useEffect(() => {
    fetchDataForUserFavorites();
  }, [userID]); // Trigger the fetch when userID changes

  // Function to fetch data for PropertiesSidebar
  const fetchDataForPropertiesSidebar = async () => {
    try {
      // Fetch limit-agents
      console.log("start useEffect limit-agents");
      const usersRes = await axios.get("http://localhost:5000/api/user/limit-agents");
      setUserSidebar(usersRes.data.users);

      // Fetch limit-blogs
      console.log("start useEffect limit-blogs");
      const blogsRes = await axios.get("http://localhost:5000/api/blog/limit-blogs");
      setBlogSidebar(blogsRes.data.blogs);
    } catch (error) {
      console.error("Error fetching data for PropertiesSidebar:", error);
    }
  };

  // Function to fetch data for user favorites
  const fetchDataForUserFavorites = async () => {
    if (userID) {
      console.log("start useEffect fetchUserFavorites");
      try {
        const userFavorites = await fetchUserFavorites(userID);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    }
  };

  // ... rest of the code
}
