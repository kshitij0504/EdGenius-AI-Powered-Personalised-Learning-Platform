// components/learning/AnalysisSection.jsx
import React from 'react';

const AnalysisSection = ({ analysis, onStartLearning, darkMode = false }) => {
  const getScoreGradient = (percentage) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80)
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#fff" strokeWidth="2" />
          <path d="M12 20l6 6 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    if (percentage >= 60)
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
          <path d="M20 14v12M14 20h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="#fff" strokeWidth="2" />
        <path d="M15 15l10 10M25 15L15 25" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  };

  const bgSection = darkMode ? 'bg-black' : 'bg-white';
  const textMain = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderMain = darkMode ? 'border-gray-800' : 'border-gray-100';

  return (
    <div className={`${bgSection} rounded-3xl shadow-2xl border ${borderMain} p-8 transition-colors duration-300`}>
      {/* Header */}
      <h2 className={`text-2xl font-extrabold ${textMain} mb-8 flex items-center gap-3`}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill="#2563eb" />
          <text x="6" y="19" fill="#fff" fontSize="12" fontWeight="bold">AI</text>
        </svg>
        Nova's Analysis
      </h2>

      {/* Score Overview */}
      <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className={`relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r ${getScoreGradient(analysis.score_percentage)} rounded-full text-white mb-4 shadow-xl`}>
            <div className="absolute inset-0 flex items-center justify-center">
              {getScoreIcon(analysis.score_percentage)}
            </div>
            <span className="absolute bottom-2 text-2xl font-black tracking-tight">{analysis.score_percentage}%</span>
          </div>
          <div className={`text-2xl font-semibold ${textMain} mb-1`}>
            {analysis.score_percentage >= 80 ? 'Outstanding!' : analysis.score_percentage >= 60 ? 'Good Work!' : 'Keep Improving!'}
          </div>
          <p className={`${textSub} text-center`}>
            Scored <span className="font-bold text-blue-600 dark:text-blue-400">{analysis.correct_answers}</span> out of{' '}
            <span className="font-bold">{analysis.total_questions}</span> questions
          </p>
        </div>
      </div>

      {/* Weak Areas */}
      {analysis.weak_areas && analysis.weak_areas.length > 0 && (
        <div className="mb-10">
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textMain}`}>
            <svg width="22" height="22" className="text-orange-600" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" fill="#f97316" />
              <circle cx="11" cy="11" r="5" fill="#fff" />
              <circle cx="11" cy="11" r="2" fill="#fb923c" />
            </svg>
            Areas to Focus On
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.weak_areas.map((area, index) => (
              <div key={index} className="p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-900 rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-xl">!</div>
                <div>
                  <h4 className="font-semibold text-orange-900 dark:text-orange-200">{area}</h4>
                  <span className="text-xs text-orange-700 dark:text-orange-300">Needs improvement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mb-10">
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textMain}`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <ellipse cx="11" cy="11.5" rx="7" ry="9" fill="#2563eb" />
              <rect x="8" y="17" width="6" height="3" rx="1" fill="#dbeafe" />
            </svg>
            Nova's Recommendations
          </h3>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-xl">
                <svg width="20" height="20" className="text-blue-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#3b82f6" />
                  <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-blue-800 dark:text-blue-300">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Feedback */}
      {analysis.detailed_feedback && analysis.detailed_feedback.length > 0 && (
        <div className="mb-10">
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textMain}`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="4" fill="#6366f1" />
              <text x="4" y="16" fill="#fff" fontSize="12" fontWeight="bold">QA</text>
            </svg>
            Question-by-Question Review
          </h3>
          <div className="space-y-4">
            {analysis.detailed_feedback.map((fb, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border-2 flex items-start gap-4 transition-colors duration-200 ${
                  fb.is_correct
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/30 dark:border-green-900'
                    : 'border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${fb.is_correct ? 'bg-green-500' : 'bg-red-500'}`}>
                  {fb.is_correct ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 12l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${textMain} mb-2`}>Q{idx + 1}: {fb.question}</h4>
                  {!fb.is_correct && (
                    <div className="mb-2 space-y-1">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        <span className="font-medium">Your answer:</span> {fb.user_answer}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <span className="font-medium">Correct answer:</span> {fb.correct_answer}
                      </p>
                    </div>
                  )}
                  <p className={`text-sm ${textSub}`}>{fb.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button to Start Learning */}
      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-2xl border border-indigo-200 dark:border-indigo-900">
        <h3 className={`text-lg font-semibold ${textMain} mb-2 flex items-center gap-2`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Ready to Level Up?
        </h3>
        <p className={`${textSub} mb-4`}>
          Based on your performance, I've created a personalized learning path just for you. Let's strengthen those weak areas!
        </p>
        <button
          onClick={onStartLearning}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 2v16M2 10h16" />
          </svg>
          Start Personalized Learning
        </button>
      </div>
    </div>
  );
};

export default AnalysisSection;
