import { fetcher } from './src/utils/fetcher';

// Example URL
const apiUrl = 'https://api.example.com/data';

// Example Access Token
const accessToken = 'YOUR_ACCESS_TOKEN';

// Optional: You can configure Axios options if needed.
const axiosConfig = {
  headers: {
    'Custom-Header': 'header-value',
  },
  // You can add more Axios configuration options here.
};

// Call the fetcher function with the access token
const fetchDataWithToken = async () => {
  try {
    const result = await fetcher(apiUrl, accessToken, axiosConfig);
    console.log('Data with token:', result);
  } catch (error) {
    console.error('Error with token:', error.message);
  }
};

// Call the function to initiate the request
fetchDataWithToken();
