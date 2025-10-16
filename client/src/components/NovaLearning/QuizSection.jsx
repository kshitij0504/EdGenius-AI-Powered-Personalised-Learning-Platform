import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Loader2, Send, BookOpen } from 'lucide-react';

const QuizSection = ({ quiz, onSubmit, loading }) => {
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
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Glass Card Container */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white/20 dark:border-slate-700/50 overflow-hidden">
        {/* Header with Progress */}
        <div className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/50 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Question {currentQuestion + 1} of {quiz.length}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {Object.keys(selectedAnswers).length} answered
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          {/* Question Text */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold mb-4">
              <Circle className="w-3 h-3 fill-current" />
              Multiple Choice
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion] === option;
              const optionLabel = String.fromCharCode(65 + idx);
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(currentQuestion, option)}
                  className={`
                    group w-full p-5 rounded-xl border-2 transition-all duration-300 text-left
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-500 dark:border-blue-600 shadow-lg shadow-blue-500/20' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Option Letter Badge */}
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300
                      ${isSelected 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                      }
                    `}>
                      {optionLabel}
                    </div>
                    
                    {/* Option Text */}
                    <span className={`
                      flex-1 font-medium transition-colors
                      ${isSelected 
                        ? 'text-blue-900 dark:text-blue-100' 
                        : 'text-slate-700 dark:text-slate-200'
                      }
                    `}>
                      {option}
                    </span>
                    
                    {/* Check Icon */}
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentQuestion < quiz.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(quiz.length - 1, prev + 1))}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isAllAnswered || loading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Submit Quiz
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Answer Counter Pills */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2 justify-center">
              {quiz.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`
                    w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200
                    ${currentQuestion === idx 
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-110' 
                      : selectedAnswers[idx]
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }
                  `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
