// // helpers/API/moduleApi.js
// import axios from "axios";

// const API_BASE = "http://localhost:8000/api/modules";

// export const createModule = async (courseId, data) => {
//   return axios.post(`${API_BASE}/${courseId}`, data, { withCredentials: true });
// };

// export const getModulesByCourseId = async (courseId) => {
//   return axios.get(`${API_BASE}/${courseId}`, { withCredentials: true });
// };

// export const updateModule = async (moduleId, data) => {
//   return axios.put(`${API_BASE}/update/${moduleId}`, data, {
//     withCredentials: true,
//   });
// };

// export const deleteModule = async (moduleId) => {
//   return axios.delete(`${API_BASE}/delete/${moduleId}`, {
//     withCredentials: true,
//   });
// };
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // change as needed
  withCredentials: true, // ✅ to send cookies
});

// MODULE (CHAPTER) APIs
export const getModules = (courseId) => API.get(`/module/${courseId}`);
export const createModule = (courseId, data) =>
  API.post(`/module/${courseId}`, data);
export const updateModule = (moduleId, data) =>
  API.put(`/module/${moduleId}`, data);
export const deleteModule = (moduleId) => API.delete(`/module/${moduleId}`);

// LESSON APIs
export const createLesson = (moduleId, data) =>
  API.post(`/lesson/${moduleId}`, data);
export const updateLesson = (lessonId, data) =>
  API.put(`/lesson/${lessonId}`, data);
export const deleteLesson = (lessonId) => API.delete(`/lesson/${lessonId}`);
