// components/learning/AnalysisSection.jsx
import React from "react";

const AnalysisSection = ({ analysis }) => {
  console.log(analysis);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "from-green-500 to-emerald-600";
    if (percentage >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  const getScoreEmoji = (percentage) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        📊 Nova's Analysis
      </h2>

      {/* Score Overview */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${getScoreColor(
              analysis.score_percentage
            )} rounded-full text-white text-3xl font-bold mb-4 shadow-lg`}
          >
            {analysis.score_percentage}%
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {getScoreEmoji(analysis.score_percentage)} Great effort!
          </h3>
          <p className="text-gray-600">
            You got {analysis.correct_answers} out of {analysis.total_questions}{" "}
            questions correct
          </p>
        </div>
      </div>

      {/* Weak Areas */}
      {analysis.weak_areas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 Areas to Focus On
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.weak_areas.map((area, index) => (
              <div
                key={index}
                className="p-4 bg-orange-50 border border-orange-200 rounded-xl"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                    !
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900">{area}</h4>
                    <p className="text-sm text-orange-700">Needs improvement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Nova's Recommendations
        </h3>
        <div className="space-y-3">
          {analysis.recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
            >
              <p className="text-blue-800">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Feedback */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📝 Question by Question Review
        </h3>
        <div className="space-y-4">
          {analysis.detailed_feedback.map((feedback, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${
                feedback.is_correct
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                    feedback.is_correct ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {feedback.is_correct ? "✓" : "✗"}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Q{index + 1}: {feedback.question}
                  </h4>
                  {!feedback.is_correct && (
                    <div className="mb-2">
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Your answer:</span>{" "}
                        {feedback.user_answer}
                      </p>
                      <p className="text-sm text-green-700">
                        <span className="font-medium">Correct answer:</span>{" "}
                        {feedback.correct_answer}
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-gray-700">
                    {feedback.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
