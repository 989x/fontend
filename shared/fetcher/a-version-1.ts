import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * A utility function for making HTTP GET requests using Axios.
 *
 * @param {string} url - The URL to send the GET request to.
 * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
 * @returns {Promise<any>} A Promise that resolves with the response data or rejects with an error.
 */
export const fetcher = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(url, config);

    // Check if the response status code is in the 200-299 range.
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      // Handle non-successful HTTP responses here (e.g., throw an error).
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // Handle any network or request errors.
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      // You can handle specific Axios error types here.
      // For example, if the error is due to a network issue:
      if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please check your internet connection.');
      }
    }
    // Re-throw the error for the caller to handle.
    throw error;
  }
};

// Usage example:
// const url = 'https://api.example.com/data';
// const config = { headers: { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' } };
// try {
//   const result = await fetcher(url, config);
//   console.log(result);
// } catch (error) {
//   console.error(error.message);
// }