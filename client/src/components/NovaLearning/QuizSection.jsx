import React, { useState } from 'react';
// Example: import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'; // Use your preferred icon library

const QuizSection = ({ quiz, onSubmit, loading, darkMode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    const answers = Object.values(selectedAnswers);
    onSubmit(answers);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === quiz.length;
  const currentQ = quiz[currentQuestion];

  // Dynamic theme classes
  const bgMain = darkMode ? 'bg-black' : 'bg-white';
  const textMain = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderMain = darkMode ? 'border-gray-800' : 'border-gray-100';
  const cardBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const optionBgActive = darkMode ? 'bg-blue-900' : 'bg-blue-50';
  const optionBorderActive = 'border-blue-500';
  const optionBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const optionBorder = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`${bgMain} rounded-3xl shadow-2xl ${borderMain} border transition-colors duration-300`}>
      {/* Quiz Header */}
      <div className={`p-8 border-b ${borderMain}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${textMain}`}>Knowledge Assessment</h2>
          <div className="flex items-center text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {currentQuestion + 1} of {quiz.length}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className={`p-8 ${cardBg} transition-colors duration-300`}>
        <div className="mb-8">
          <h3 className={`text-xl font-semibold ${textMain} mb-6 leading-relaxed`}>
            {currentQ.question}
          </h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, option)}
                  className={`w-full p-4 text-left rounded-xl border-2 flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${isSelected
                      ? `${optionBorderActive} ${optionBgActive} scale-[1.02]`
                      : `${optionBorder} hover:${optionBg} hover:border-blue-300`
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}
                  `}>
                    {isSelected && (
                      // Replace with a minimal check icon from your icon library
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="white" />
                        <path d="M5 8.5L7 10.5L11 6.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={darkMode ? 'text-gray-100' : 'text-gray-800'}>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 border ${borderMain} rounded-xl font-medium ${textMain} hover:${optionBg} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2`}
          >
            {/* Replace with left arrow icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
              <path d="M12 6l-6 6 6 6"/>
            </svg>
            Previous
          </button>

          <div className="flex space-x-2">
            {quiz.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[index]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered || loading}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {/* Replace with check icon */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M5 10l4 4 6-6"/>
              </svg>
              {loading ? 'Analyzing...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(quiz.length - 1, prev + 1))}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
            >
              Next
              {/* Replace with right arrow icon */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                <path d="M8 6l6 6-6 6"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
