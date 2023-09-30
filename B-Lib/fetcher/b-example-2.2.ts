import { fetcher } from './src/utils/fetcher';

// Example URL
const apiUrl = 'https://api.example.com/data';

// Optional: You can configure Axios options if needed.
const axiosConfig = {
  headers: {
    'Custom-Header': 'header-value',
  },
  // You can add more Axios configuration options here.
};

// Call the fetcher function without the access token
const fetchDataWithoutToken = async () => {
  try {
    const result = await fetcher(apiUrl, undefined, axiosConfig);
    console.log('Data without token:', result);
  } catch (error) {
    console.error('Error without token:', error.message);
  }
};

// Call the function to initiate the request
fetchDataWithoutToken();
