// src/services/quizService.js
import axios from 'axios';

// Set the base URL from your local backend endpoint
const API_URL = 'http://127.0.0.1:8000';

/**
 * Generates a quiz based on a topic.
 * The topic is sent as a URL query parameter.
 * @param {string} topic - The topic for the quiz.
 * @returns {Promise<Array>} The quiz data.
 */
export const generateQuiz = async (topic) => {
  try {
    // CORRECTED: Changed from axios.post to axios.get to match the @app.get in FastAPI.
    // The `params` object correctly adds the topic as a query string.
    const response = await axios.get(`${API_URL}/generate-quiz`, {
        params: {
            topic // This is shorthand for topic: topic
        }
    });
    // The backend returns a structure {"status": "success", "data": [...]},
    // so we need to access the .data property.
    return response.data.data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    // Propagate a user-friendly error message
    throw new Error(error.response?.data?.detail || "Failed to generate the quiz.");
  }
};

/**
 * Analyzes the user's quiz answers.
 * The quiz data and answers are sent in the request body.
 * @param {Array<string>} userAnswers - The user's submitted answers.
 * @param {Array<Object>} quiz - The original quiz data.
 * @returns {Promise<Object>} The analysis data.
 */
export const analyzeQuiz = async (userAnswers, quiz) => {
  try {
    // CORRECTED: The backend expects `user_answers` as a List of Dictionaries.
    // We transform the array of strings into an array of objects to match.
    const formattedAnswers = userAnswers.map(answer => ({ "answer": answer }));

    const payload = {
      user_answers: formattedAnswers, // Send the newly formatted array
      quiz: quiz,
    };
    
    // This remains a POST request, which is correct for sending a payload.
    const response = await axios.post(`${API_URL}/analyze-quiz`, payload);
    // Access the nested .data property from the backend response.
    return response.data.data;
  } catch (error)
    {
    console.error("Error analyzing quiz:", error);
    throw new Error(error.response?.data?.detail || "Failed to analyze the quiz results.");
  }
};
