import getApi from "../../../helpers/API/getApi";
import postApi from "../../../helpers/API/postApi";

export const progressAPI = {
  // Get user statistics
  getStats: async () => {
    try {
      console.log('API Call: Getting user stats');
      const response = await getApi('/api/progress/stats');
      console.log('Stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Get overall progress
  getOverview: async () => {
    try {
      console.log('API Call: Getting progress overview');
      const response = await getApi('/api/progress/overview');
      console.log('Overview response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching overview:', error);
      throw error;
    }
  },

  // Get course progress
  getCourseProgress: async (courseId) => {
    try {
      console.log('API Call: Getting course progress for', courseId);
      const response = await getApi(`/api/progress/course/${courseId}`);
      console.log('Course progress response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  },

  // Get lesson progress
  getLessonProgress: async (lessonId) => {
    try {
      console.log('API Call: Getting lesson progress', lessonId);
      const response = await getApi(`/api/progress/lesson/${lessonId}`);
      console.log('Lesson progress response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      throw error;
    }
  },

  // Mark lesson complete
  markLessonComplete: async (lessonId, completed = true) => {
    try {
      console.log('API Call: Marking lesson complete', lessonId, completed);
      const response = await postApi(`/api/progress/lesson/${lessonId}/complete`, {
        completed
      });
      console.log('Mark complete response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      throw error;
    }
  },

  // Update video progress
  updateVideoProgress: async (lessonId, progressData) => {
    try {
      console.log('API Call: Updating video progress', lessonId, progressData);
      const response = await postApi(
        `/api/progress/lesson/${lessonId}/video-progress`,
        progressData
      );
      console.log('Video progress response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating video progress:', error);
      throw error;
    }
  },

  // Get video progress
  getVideoProgress: async (lessonId) => {
    try {
      console.log('API Call: Getting video progress', lessonId);
      const response = await getApi(`/api/progress/lesson/${lessonId}/video-progress`);
      console.log('Video progress response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching video progress:', error);
      throw error;
    }
  }
};

export default progressAPI;
