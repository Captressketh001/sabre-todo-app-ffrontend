import axios, { AxiosError, AxiosResponse } from 'axios';
import { SERVER_URL } from './process';
import { ApiResponse, ErrorResponse } from '@/interface-and-types';

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";
apiClient.defaults.headers.common["Accept"] = "application/json";

apiClient.interceptors.request.use(
  async (config) => {
      config.headers = config.headers || {};
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => response,
  (error: AxiosError) => {
    const defaultErrorMessage = "An unexpected error occurred.";
    const errorDetails = {
      message: defaultErrorMessage,
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    };

    if (error.response) {
      const response = error.response.data as ErrorResponse;
      console.error("API error:", {
        status: error.response.status,
        data: response,
        headers: error.response.headers,
      });

      // Use msg and status if available
      if (response?.msg && response?.status) {
        if (response.status === '401'){
          errorDetails.message = "UNAUTHORIZED_ACCESS";
          errorDetails.status = parseInt(response.status, 10) || error.response.status;
        } else {
          errorDetails.message = response.msg;
          errorDetails.status = parseInt(response.status, 10) || error.response.status;
        }
        
      } else {
        // Customize fallback error messages based on HTTP status
        switch (error.response.status) {
          case 400:
            errorDetails.message = "Bad Request. Please check your input.";
            break;
          case 401:
            errorDetails.message = "UNAUTHORIZED_ACCESS";
            break;
          case 403:
            errorDetails.message = "Forbidden - you do not have permission to access this resource.";
            break;
          case 404:
            errorDetails.message = "NOT_FOUND";
            break;
          case 422:
            errorDetails.message = "Validation error occurred.";
            break;
          case 500:
            errorDetails.message = "Server error occurred. Please try again later.";
            break;
          default:
            errorDetails.message = `An error occurred: ${error.response.status}`;
        }
      }
    } else if (error.request) {
      console.error("Network error:", {
        message: error.message,
        config: error.config,
      });
      errorDetails.message = "Network error. Please check your connection.";
    } else {
      console.error("Unexpected error:", {
        message: error.message,
        config: error.config,
      });
      errorDetails.message = "Unexpected error. Please try again later.";
    }
    // Reject the Promise with the detailed error object
    return Promise.reject(errorDetails);
  }
);


export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
} as const;
