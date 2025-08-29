import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8000/api/courses";
const API = "http://localhost:8000/api/instructor/courses";

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
export const getCourseById = async (courseId) => {
  const token = Cookies.get("authToken");

  return axios.get(`${API}/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};
export const getCoursesByInstructor = async ({
  page = 1,
  limit = 10,
  published,
  category,
  search,
}) => {
  try {
    const token = Cookies.get("authToken");

    const res = await axios.get(API, {
      params: { page, limit, published, category, search },
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// ✅ Update Course
export const updateCourse = async (courseId, courseData) => {
  const formData = new FormData();

  Object.keys(courseData).forEach((key) => {
    if (courseData[key] !== null && courseData[key] !== undefined) {
      formData.append(key, courseData[key]);
    }
  });

  return axios.put(`${API}/${courseId}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Delete Course
export const deleteCourse = async (courseId) => {
  try {
    const token = Cookies.get("authToken");

    const res = await axios.delete(`${API_URL}/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};
