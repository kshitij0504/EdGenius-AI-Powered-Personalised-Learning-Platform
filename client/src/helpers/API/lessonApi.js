// helpers/API/lessonApi.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api/lesson";

export const createLesson = (lessonData, token) => {
  return axios.post("http://localhost:8000/api/lesson/create", lessonData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const getLessonsByModule = async (moduleId) => {
  return axios.get(`${API_BASE}/${moduleId}`, { withCredentials: true });
};

export const updateLesson = async (lessonId, data) => {
  return axios.put(`${API_BASE}/${lessonId}`, data, {
    withCredentials: true,
  });
};

export const deleteLesson = async (lessonId) => {
  return axios.delete(`${API_BASE}/delete/${lessonId}`, {
    withCredentials: true,
  });
};
