import axios from 'axios'
const baseUrl = 'http://localhost:8089/'
// const baseUrl = "http://localhost:8089/api/";

const config = {
  baseUrl: baseUrl
}

const api = axios.create(config)

api.defaults.baseURL = baseUrl

// handle before call API
const handleBefore = (config) => {
  // handle hành động trước khi call API

  // lấy ra cái token và đính kèm theo cái request
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}

api.interceptors.request.use(handleBefore, null)

const geoapifyApi = axios.create({
  baseURL: 'https://api.geoapify.com/v1/'
})

export default api
export { geoapifyApi }


// import axios from "axios";

// const baseUrl = "http://localhost:8089/";

// const api = axios.create({
//   baseURL: baseUrl,
// });

// // Intercept request to attach token for authentication
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Handle response interceptor (Optional)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle global errors (e.g., 401 unauthorized, 500 server errors)
//     return Promise.reject(error);
//   }
// );

// /**
//  * Utility functions for CRUD operations
//  */
// const apiService = {
//   // GET request
//   get: async (url, params = {}, config = {}) => {
//     try {
//       const response = await api.get(url, { params, ...config });
//       return response.data;
//     } catch (error) {
//       return handleError(error);
//     }
//   },

//   // POST request
//   post: async (url, data = {}, config = {}) => {
//     try {
//       const response = await api.post(url, data, config);
//       return response.data;
//     } catch (error) {
//       return handleError(error);
//     }
//   },

//   // PUT request
//   put: async (url, data = {}, config = {}) => {
//     try {
//       const response = await api.put(url, data, config);
//       return response.data;
//     } catch (error) {
//       return handleError(error);
//     }
//   },

//   // DELETE request
//   delete: async (url, config = {}) => {
//     try {
//       const response = await api.delete(url, config);
//       return response.data;
//     } catch (error) {
//       return handleError(error);
//     }
//   },
// };

// /**
//  * Error handling function (customize as needed)
//  */
// const handleError = (error) => {
//   // Customize error handling (log, notify user, etc.)
//   console.error("API call failed:", error.response || error.message);
//   if (error.response) {
//     // You can handle specific status codes here
//     if (error.response.status === 401) {
//       // Example: Redirect to login if unauthorized
//       window.location.href = "/login";
//     }
//   }
//   return Promise.reject(error.response?.data || error.message);
// };

// export default apiService;

// const geoapifyApi = axios.create({
//   baseURL: "https://api.geoapify.com/v1/",
// });

// export { geoapifyApi };
