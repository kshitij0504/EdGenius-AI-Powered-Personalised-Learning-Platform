import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8000/api/courses";

export const createCourse = async (courseData) => {
  const formData = new FormData();
  Object.keys(courseData).forEach((key) => {
    formData.append(key, courseData[key]);
  });

  return axios.post(API_BASE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const getAllCourses = async (slug) => {
  return axios.get(API_BASE, {
    withCredentials: true,
  });
};

export const getCourseBySlug = async (slug) => {
  return axios.get(`${API_BASE}/${slug}`, {
    withCredentials: true,
  });
};
