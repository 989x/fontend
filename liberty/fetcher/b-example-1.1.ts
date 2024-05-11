import { fetcher } from './src/utils/fetcher';

// Define the URL you want to fetch data from.
const apiUrl = 'https://api.example.com/data';

// Optional: You can configure Axios options if needed.
const axiosConfig = {
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  },
  // You can add more Axios configuration options here.
};

// Create an async function to make the API request.
const fetchData = async () => {
  try {
    // Use the fetcher function to make the GET request.
    const result = await fetcher(apiUrl, axiosConfig);

    // Handle the data or perform operations as needed.
    console.log('Data:', result);
  } catch (error) {
    // Handle any errors that may occur during the request.
    console.error('Error:', error.message);
  }
};

// Call the fetchData function to initiate the API request.
fetchData();
