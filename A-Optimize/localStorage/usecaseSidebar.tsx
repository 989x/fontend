import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Properties({ estates, keyword }: PropertiesProps) {
  // Initialize state for userSidebar and blogSidebar using useState
  const [userSidebar, setUserSidebar] = useState<string[]>([]);
  const [blogSidebar, setBlogSidebar] = useState<any[]>([]);

  // Define a function to check if the stored data has expired
  const isDataExpired = (timestamp) => {
    const now = new Date().getTime();
    const dataTimestamp = new Date(timestamp).getTime();
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    return now - dataTimestamp > sevenDaysInMilliseconds;
  };

  // ________________________________________ PropertiesSidebar

  const fetchDataForPropertiesSidebar = async () => {
    try {
      // Fetch limit-agents
      const usersRes = await axios.get("http://localhost:5000/api/user/limit-agents");
      const usersData = usersRes.data.users;

      // Store data with a timestamp
      const userDataWithTimestamp = {
        data: usersData,
        timestamp: new Date().toISOString(),
      };

      setUserSidebar(userDataWithTimestamp.data);

      // Cache the data in localStorage
      localStorage.setItem('userSidebar', JSON.stringify(userDataWithTimestamp));

      // Fetch limit-blogs
      const blogsRes = await axios.get("http://localhost:5000/api/blog/limit-blogs");
      const blogsData = blogsRes.data.blogs;

      // Store data with a timestamp
      const blogDataWithTimestamp = {
        data: blogsData,
        timestamp: new Date().toISOString(),
      };

      setBlogSidebar(blogDataWithTimestamp.data);

      // Cache the data in localStorage
      localStorage.setItem('blogSidebar', JSON.stringify(blogDataWithTimestamp));
    } catch (error) {
      return;
    }
  };

  // Use useEffect to fetch data only on the initial component mount
  useEffect(() => {
    // Check if the data is already in localStorage and use it if available
    const cachedUserSidebar = JSON.parse(localStorage.getItem('userSidebar') || 'null');
    const cachedBlogSidebar = JSON.parse(localStorage.getItem('blogSidebar') || 'null');

    if (
      cachedUserSidebar !== null &&
      cachedBlogSidebar !== null &&
      !isDataExpired(cachedUserSidebar.timestamp) &&
      !isDataExpired(cachedBlogSidebar.timestamp)
    ) {
      setUserSidebar(cachedUserSidebar.data);
      setBlogSidebar(cachedBlogSidebar.data);
    } else {
      // If not cached or data has expired, fetch the data
      fetchDataForPropertiesSidebar();
    }
  }, []); // Empty dependency array ensures this code runs only once when the component mounts

  return (
    // ...
  );
}
