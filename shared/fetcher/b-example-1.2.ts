// from this code, 
// How can I go into the fetcher file and then import it into this page?

// export default function UserDetail() {
//   const router = useRouter();
//   const { userID } = router.query;
//   const { data: session } = useSession();

//   const [userData, setUserData] = useState<any>("");
//   const [estatesData, setEstatesData] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [howManyPages, setHowManyPages] = useState(0);

//   const pageSize = 8; // paginatePosts

//   useEffect(() => {
//     const fetchEstatesData = async () => {
//       try {
//         if (userID) {
//           const r = await axios.get(
//             `http://localhost:5000/api/user/get/${userID}`
//           );
//           // console.log('r.data.user: ', r.data.user)
//           const user = r.data.user;
//           const estates = r.data.user.estates;
//           setUserData(user);

//           setEstatesData(estates);
//           setHowManyPages(Math.ceil(estates.length / pageSize));
//           setCurrentPage(1);
//         }
//       } catch (error) {
//         // console.error(error);

//         setEstatesData([]);
//       }
//     };

//     fetchEstatesData();
//   }, [userID]);

const fetchEstatesData = async () => {
  try {
    if (userID) {
      const url = `http://localhost:5000/api/user/get/${userID}`;
      const r = await fetcher(url); // Use the fetcher function to make the GET request
      const user = r.user;
      const estates = r.user.estates;
      setUserData(user);
      setEstatesData(estates);
      setHowManyPages(Math.ceil(estates.length / pageSize));
      setCurrentPage(1);
    }
  } catch (error) {
    // Handle errors as needed
    console.error(error);
    setEstatesData([]);
  }
};
