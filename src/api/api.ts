import axios from "axios";

let isRefreshing = false;

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const refreshRequest = async () => {
  try {
    await axios.post("/refresh", null, { withCredentials: true });
    return true;
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
      if (isRefreshing) {
        // Wait for refresh to complete
        await new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });
        return api(originalRequest);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshRequest();
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
