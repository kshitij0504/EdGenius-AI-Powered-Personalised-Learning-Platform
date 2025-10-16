// components/learning/AnalysisSection.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Award, Target, Lightbulb, ArrowRight, CheckCircle2, XCircle, Star, BarChart3, AlertCircle, Sparkles } from 'lucide-react';

const AnalysisSection = ({ analysis, onStartLearning }) => {
  const getScoreGradient = (percentage) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-indigo-600';
    return 'from-orange-500 to-red-600';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return Award;
    if (percentage >= 60) return Target;
    return Lightbulb;
  };

  const percentage = analysis.score_percentage || ((analysis.correct_answers / analysis.total_questions) * 100).toFixed(0);
  const ScoreIcon = getScoreIcon(percentage);

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white/20 dark:border-slate-700/50 overflow-hidden">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(percentage)} opacity-5`}></div>
        
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="relative flex-shrink-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(percentage)} blur-2xl opacity-30 animate-pulse`}></div>
              <div className="relative w-44 h-44 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex flex-col items-center justify-center border-8 border-slate-100 dark:border-slate-700">
                <ScoreIcon className="w-12 h-12 mb-2 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                <div className={`text-5xl font-black bg-gradient-to-br ${getScoreGradient(percentage)} bg-clip-text text-transparent`}>
                  {percentage}%
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">
                  Score
                </div>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {percentage >= 80 ? '🎉 Excellent Performance!' : percentage >= 60 ? '👏 Good Job!' : '💪 Room for Growth!'}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                You scored <span className="font-bold text-slate-900 dark:text-white">{analysis.correct_answers}</span> out of <span className="font-bold text-slate-900 dark:text-white">{analysis.total_questions}</span> questions correctly
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-black text-green-700 dark:text-green-400">
                      {analysis.correct_answers}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                    Correct Answers
                  </p>
                </div>
                
                <div className="p-5 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-2xl border-2 border-red-200 dark:border-red-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-black text-red-700 dark:text-red-400">
                      {analysis.total_questions - analysis.correct_answers}
                    </span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400 font-semibold">
                    Need Improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths, Weak Areas & Recommendations Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weak Areas */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-b border-orange-200/50 dark:border-orange-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl shadow-lg">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Weak Areas
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Focus here
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3 max-h-64 overflow-y-auto">
            {analysis.weak_areas && analysis.weak_areas.length > 0 ? (
              analysis.weak_areas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200">
                  <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-snug">
                    {area}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No weak areas identified!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Personalized Recommendations
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Next steps to improve
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3 max-h-64 overflow-y-auto">
            {analysis.recommendations && analysis.recommendations.length > 0 ? (
              analysis.recommendations.map((recommendation, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-200 group">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    {recommendation}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No recommendations available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Feedback */}
      {analysis.detailed_feedback && analysis.detailed_feedback.length > 0 && (
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Question-by-Question Analysis
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Review your answers and learn from mistakes
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-600 dark:text-slate-300">Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-slate-600 dark:text-slate-300">Incorrect</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {analysis.detailed_feedback.map((fb, idx) => {
              const isCorrect = fb.is_correct;
              
              return (
                <div key={idx} className={`
                  group relative p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg
                  ${isCorrect 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-300 dark:border-green-800' 
                    : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-300 dark:border-red-800'
                  }
                `}>
                  {/* Question Number Badge */}
                  <div className="absolute -top-3 -left-3">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg
                      ${isCorrect 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                        : 'bg-gradient-to-br from-red-500 to-rose-600 text-white'
                      }
                    `}>
                      {idx + 1}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    {isCorrect ? (
                      <div className="flex-shrink-0 p-2 bg-green-500 rounded-xl shadow-md">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 p-2 bg-red-500 rounded-xl shadow-md">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-lg text-slate-900 dark:text-white mb-1 leading-snug">
                        {fb.question}
                      </p>
                      <div className={`
                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mt-2
                        ${isCorrect 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                        }
                      `}>
                        {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                      </div>
                    </div>
                  </div>

                  {!isCorrect && (
                    <div className="space-y-3 ml-14">
                      <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-red-200 dark:border-red-800">
                        <div className="flex items-start gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
                              Your Answer
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                              {fb.user_answer}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                              Correct Answer
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                              {fb.correct_answer}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                              Explanation
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {fb.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isCorrect && (
                    <div className="ml-14 mt-3 p-4 bg-green-100 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 fill-current" />
                        <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                          {fb.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Card */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative p-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Personalized Learning Path Ready
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Ready to Master Your Weak Areas?
            </h3>
            <p className="text-blue-100 mb-6 text-lg leading-relaxed">
              Nova has generated a comprehensive lesson plan tailored specifically to your performance. Let's turn those weak areas into strengths!
            </p>
            <button
              onClick={onStartLearning}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 group"
            >
              Start Learning Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
