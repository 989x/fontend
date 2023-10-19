// ... other imports

export default function EstateDetail({ post }: any) {
  const { data: session } = useSession();
  const userID = session?.user?.userID;
  const [favorites, setFavorites] = useState<string[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    if (userID) {
      console.log("EstateDetail, start fetchUserFavorites");
      const fetchData = async () => {
        try {
          // Fetch user favorites
          const userFavorites = await fetchUserFavorites(userID);
          setFavorites(userFavorites);

          // Fetch nearby places
          console.log("PostNearby, start fetchData");
          const res = await axios.get(
            "http://localhost:5000/api/estate/limit-estates"
          );
          setNearbyPlaces(res.data.estates);
        } catch (error) {
          // Handle error if needed
          return;
        }
      };

      fetchData();
    }
  }, [userID]);

  // ... rest of the code
}
