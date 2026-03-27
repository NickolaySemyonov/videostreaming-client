import axios from "axios";

let refreshPromise: Promise<any> | null = null;

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const refreshRequest = async () => {
  try {
    // Create a separate axios instance for refresh to avoid interceptor loops
    const refreshApi = axios.create({
      baseURL: "http://localhost:8080",
      withCredentials: true,
    });

    const response = await refreshApi.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error("Refresh error:", error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (refreshPromise) {
        // Wait for the existing refresh to complete
        await refreshPromise;
        // Retry the original request
        return api(originalRequest);
      }

      originalRequest._retry = true;

      // Store the refresh promise so other requests can wait for it
      refreshPromise = refreshRequest()
        .catch((refreshError) => {
          window.location.href = "/login";
          throw refreshError;
        })
        .finally(() => {
          refreshPromise = null;
        });

      await refreshPromise;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
