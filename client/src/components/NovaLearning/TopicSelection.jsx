// components/learning/TopicSelectionCard.jsx
import React from 'react';

const TopicSelectionCard = ({ 
  selectedTopic, 
  setSelectedTopic, 
  skillLevel, 
  setSkillLevel, 
  onGenerateQuiz, 
  loading 
}) => {
  const popularTopics = [
    { name: 'Python Fundamentals', icon: '🐍', color: 'from-green-500 to-emerald-600' },
    { name: 'JavaScript ES6+', icon: '⚡', color: 'from-yellow-500 to-orange-600' },
    { name: 'React Development', icon: '⚛️', color: 'from-blue-500 to-cyan-600' },
    { name: 'DSA with Java', icon: '☕', color: 'from-orange-500 to-red-600' },
    { name: 'Node.js Backend', icon: '🟢', color: 'from-green-600 to-teal-600' },
    { name: 'Machine Learning', icon: '🤖', color: 'from-purple-500 to-pink-600' }
  ];

  const skillLevels = [
    { value: 'Beginner', icon: '🌱', description: 'New to this topic' },
    { value: 'Intermediate', icon: '🚀', description: 'Some experience' },
    { value: 'Advanced', icon: '🎯', description: 'Looking to master' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Let's Start Your Learning Journey
        </h2>
        <p className="text-gray-600 text-lg">
          Choose a topic and Nova will create a personalized learning experience for you
        </p>
      </div>

      {/* Custom Topic Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          What would you like to learn today?
        </label>
        <div className="relative">
          <input
            type="text"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            placeholder="Enter any topic (e.g., Python Lists, React Hooks, SQL Queries...)"
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
            🔍
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Or choose from popular topics:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularTopics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => setSelectedTopic(topic.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedTopic === topic.name
                  ? 'border-blue-500 bg-blue-50 transform scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center text-2xl mb-3 mx-auto`}>
                {topic.icon}
              </div>
              <p className="text-sm font-medium text-gray-800">{topic.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Skill Level Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Select your current level:</h3>
        <div className="grid grid-cols-3 gap-4">
          {skillLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setSkillLevel(level.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                skillLevel === level.value
                  ? 'border-blue-500 bg-blue-50 transform scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{level.icon}</div>
              <h4 className="font-semibold text-gray-800">{level.value}</h4>
              <p className="text-xs text-gray-600">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerateQuiz}
        disabled={!selectedTopic.trim() || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-semibold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
            Nova is preparing your quiz...
          </div>
        ) : (
          <>
            ✨ Let Nova Create Your Learning Path
          </>
        )}
      </button>
    </div>
  );
};

export default TopicSelectionCard;
