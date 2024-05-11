import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * A utility function for making HTTP GET requests using Axios.
 *
 * @param {string} url - The URL to send the GET request to.
 * @param {string | undefined} [accessToken] - Optional access token for authorization.
 * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
 * @returns {Promise<any>} A Promise that resolves with the response data or rejects with an error.
 */
export const fetcher = async (url: string, accessToken?: string, config?: AxiosRequestConfig): Promise<any> => {
  try {
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    const response: AxiosResponse = await axios.get(url, { headers, ...config });

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
// const accessToken = 'YOUR_ACCESS_TOKEN';
// const config = { headers: { 'Custom-Header': 'header-value' } };
// try {
//   const result = await fetcher(url, accessToken, config);
//   console.log(result);
// } catch (error) {
//   console.error(error.message);
// }
