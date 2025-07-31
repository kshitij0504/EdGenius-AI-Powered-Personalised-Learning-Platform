import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Trophy,
  Star,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Zap,
  Target,
  Award,
  Brain,
} from "lucide-react";

const EdgeniusQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const quizData = {
    title: "AI & Machine Learning Mastery",
    description: "Unlock your potential in artificial intelligence",
    questions: [
      {
        id: 1,
        question: "What is the primary goal of supervised learning?",
        options: [
          "To learn patterns from labeled data",
          "To discover hidden structures in data",
          "To make decisions in an environment",
          "To generate new data samples",
        ],
        correct: 0,
        explanation:
          "Supervised learning uses labeled training data to learn a mapping from inputs to outputs.",
      },
      {
        id: 2,
        question:
          "Which activation function is most commonly used in hidden layers of deep neural networks?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correct: 2,
        explanation:
          "ReLU (Rectified Linear Unit) is widely used due to its computational efficiency and ability to mitigate vanishing gradient problems.",
      },
      {
        id: 3,
        question: "What does 'overfitting' mean in machine learning?",
        options: [
          "Model performs well on all datasets",
          "Model learns training data too specifically",
          "Model has too few parameters",
          "Model trains too quickly",
        ],
        correct: 1,
        explanation:
          "Overfitting occurs when a model learns the training data so specifically that it fails to generalize to new, unseen data.",
      },
      {
        id: 4,
        question: "Which technique is used to prevent overfitting?",
        options: [
          "Increasing model complexity",
          "Adding more training data",
          "Regularization",
          "Both B and C",
        ],
        correct: 3,
        explanation:
          "Both adding more training data and regularization techniques help prevent overfitting by improving generalization.",
      },
      {
        id: 5,
        question: "What is the purpose of backpropagation in neural networks?",
        options: [
          "Forward pass computation",
          "Weight initialization",
          "Gradient computation for weight updates",
          "Data preprocessing",
        ],
        correct: 2,
        explanation:
          "Backpropagation computes gradients of the loss function with respect to network weights, enabling weight updates during training.",
      },
    ],
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
      setShowAnswerFeedback(true);

      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setShowAnswerFeedback(false);
          if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
          } else {
            handleQuizComplete();
          }
          setIsTransitioning(false);
        }, 300);
      }, 2000);
    }
  };

  const handleQuizComplete = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setShowResult(true);
      setIsTransitioning(false);
    }, 500);
  };

  const calculateResults = () => {
    let correct = 0;
    Object.keys(answers).forEach((questionIndex) => {
      if (
        answers[questionIndex] === quizData.questions[questionIndex].correct
      ) {
        correct++;
      }
    });

    const total = quizData.questions.length;
    const percentage = Math.round((correct / total) * 100);

    return { correct, total, percentage };
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90)
      return {
        level: "Genius Level",
        color: "from-[#4682A9] to-[#749BC2]",
        textColor: "text-[#4682A9]",
        icon: Brain,
        message: "Outstanding! You're a true AI expert!",
      };
    if (percentage >= 70)
      return {
        level: "Advanced Level",
        color: "from-[#749BC2] to-[#91C8E4]",
        textColor: "text-[#749BC2]",
        icon: Award,
        message: "Excellent work! You have strong knowledge!",
      };
    if (percentage >= 50)
      return {
        level: "Intermediate",
        color: "from-[#91C8E4] to-[#FFFBDE]",
        textColor: "text-[#91C8E4]",
        icon: Target,
        message: "Good progress! Keep learning!",
      };
    return {
      level: "Beginner",
      color: "from-red-400 to-pink-500",
      textColor: "text-red-600",
      icon: BookOpen,
      message: "Don't give up! Practice makes perfect!",
    };
  };

  const resetQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers({});
      setShowResult(false);
      setQuizStarted(false);
      setShowAnswerFeedback(false);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    if (showResult) {
      const results = calculateResults();
      const performance = getPerformanceLevel(results.percentage);
      console.log("Simulating PDF generation for quiz summary...");
    }
  }, [showResult]);

  if (!quizStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4]/20 to-[#749BC2]/20">
        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-white/20 transform hover:scale-105 transition-all duration-500">
            <div className="text-center">
              <div className="mb-8">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#749BC2] to-[#4682A9] flex items-center justify-center shadow-2xl">
                    <Brain className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] bg-clip-text text-transparent animate-fade-in">
                  {quizData.title}
                </h1>
                <p className="text-xl text-gray-700 mb-8 animate-fade-in">
                  {quizData.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#91C8E4]/20 backdrop-blur border border-[#91C8E4]/30 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-[#749BC2]" />
                    <span className="font-medium text-gray-800">
                      Questions:
                    </span>
                  </div>
                  <span className="font-bold text-2xl text-[#749BC2]">
                    {quizData.questions.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setQuizStarted(true)}
                className="group relative w-full py-5 px-8 rounded-2xl text-white font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] animate-gradient-x"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 animate-pulse" />
                  Start Your Journey
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const results = calculateResults();
    const performance = getPerformanceLevel(results.percentage);
    const PerformanceIcon = performance.icon;

    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4]/20 to-[#749BC2]/20">
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-4xl w-full border border-white/20 animate-scale-in">
              <div className="text-center">
                <div className="mb-8">
                  <div className="relative mb-6">
                    <div
                      className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${performance.color} flex items-center justify-center shadow-2xl`}
                    >
                      <PerformanceIcon className="w-16 h-16 text-white animate-pulse" />
                    </div>
                  </div>

                  <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] bg-clip-text text-transparent animate-fade-in">
                    Mission Complete!
                  </h1>
                  <h2
                    className={`text-3xl font-bold mb-2 bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}
                  >
                    {performance.level}
                  </h2>
                  <p className="text-xl text-gray-700 animate-fade-in">
                    {performance.message}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="group p-6 rounded-2xl bg-[#91C8E4]/20 backdrop-blur border border-[#91C8E4]/30 transform hover:scale-110 transition-all duration-500">
                    <div className="text-4xl font-bold mb-2 text-[#749BC2]">
                      {results.correct}
                    </div>
                    <div className="text-gray-800 group-hover:text-[#4682A9] transition-colors">
                      Correct Answers
                    </div>
                  </div>

                  <div className="group p-6 rounded-2xl bg-[#749BC2]/20 backdrop-blur border border-[#749BC2]/30 transform hover:scale-110 transition-all duration-500">
                    <div className="text-4xl font-bold mb-2 text-[#4682A9]">
                      {results.percentage}%
                    </div>
                    <div className="text-gray-800 group-hover:text-[#749BC2] transition-colors">
                      Final Score
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="relative">
                    <div className="w-full h-6 rounded-full bg-gray-300/50 backdrop-blur border border-gray-400/30 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${performance.color} transition-all duration-2000 ease-out animate-progress-fill shadow-lg`}
                        style={{ width: `${results.percentage}%` }}
                      >
                        <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  </div>
                  <p className="text-gray-700 mt-4">
                    You mastered {results.correct} out of {results.total}{" "}
                    concepts
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] animate-gradient-x"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative text-white flex items-center gap-2">
                      <RotateCcw className="w-5 h-5" />
                      Challenge Again
                    </span>
                  </button>

                  <button className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x"></div>
                    <span className="relative text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      View Analytics
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4]/20 to-[#749BC2]/20">
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-slide-in-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#749BC2] to-[#4682A9] bg-clip-text text-transparent">
                Edgenius AI Quiz
              </h1>
              <p className="text-gray-700">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </p>
            </div>
          </div>

          <div className="mt-6 relative">
            <div className="w-full h-3 rounded-full bg-gray-300/50 backdrop-blur border border-gray-400/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`container mx-auto px-4 py-8 transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 transform translate-y-8"
            : "opacity-100 transform translate-y-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-up">
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#749BC2] to-[#4682A9] flex items-center justify-center flex-shrink-0 animate-pulse">
                  <span className="text-white font-bold text-xl">
                    {currentQuestion + 1}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswerFeedback}
                  className={`group w-full p-6 rounded-2xl text-left transition-all duration-500 transform hover:scale-102 border ${
                    selectedAnswer === index
                      ? showAnswerFeedback
                        ? index === currentQ.correct
                          ? "bg-emerald-500/20 border-emerald-400 shadow-emerald-400/50 shadow-lg animate-success-pulse"
                          : "bg-red-500/20 border-red-400 shadow-red-400/50 shadow-lg animate-error-shake"
                        : "bg-[#91C8E4]/30 border-[#749BC2] shadow-[#749BC2]/50 shadow-lg"
                      : showAnswerFeedback && index === currentQ.correct
                      ? "bg-emerald-500/20 border-emerald-400 shadow-emerald-400/50 shadow-lg animate-success-pulse"
                      : "bg-white/20 border-white/20 hover:bg-white/30 hover:border-white/40 hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                          selectedAnswer === index
                            ? showAnswerFeedback
                              ? index === currentQ.correct
                                ? "bg-emerald-400 text-white"
                                : "bg-red-400 text-white"
                              : "bg-[#749BC2] text-white"
                            : showAnswerFeedback && index === currentQ.correct
                            ? "bg-emerald-400 text-white"
                            : "bg-gray-400 text-gray-800 group-hover:bg-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg font-medium text-gray-800 group-hover:text-[#4682A9] transition-colors duration-300">
                        {option}
                      </span>
                    </div>

                    {showAnswerFeedback && (
                      <div className="animate-bounce-in">
                        {selectedAnswer === index ? (
                          index === currentQ.correct ? (
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                          ) : (
                            <XCircle className="w-8 h-8 text-red-400" />
                          )
                        ) : index === currentQ.correct ? (
                          <CheckCircle className="w-8 h-8 text-emerald-400" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showAnswerFeedback && (
              <div className="mt-8 p-6 rounded-2xl bg-[#91C8E4]/20 border border-[#91C8E4]/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#749BC2] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#749BC2] mb-2">
                      Explanation:
                    </h4>
                    <p className="text-gray-800 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showAnswerFeedback}
              className={`group relative px-10 py-5 rounded-2xl font-bold text-xl overflow-hidden transform transition-all duration-500 ${
                selectedAnswer === null || showAnswerFeedback
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "hover:scale-105 shadow-2xl"
              }`}
            >
              {selectedAnswer !== null && !showAnswerFeedback && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#749BC2] via-[#91C8E4] to-[#4682A9] animate-gradient-x"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </>
              )}
              <span className="relative text-white flex items-center gap-3">
                {currentQuestion === quizData.questions.length - 1 ? (
                  <>
                    <Trophy className="w-6 h-6" />
                    Complete Quiz
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-success-pulse {
          animation: success-pulse 1.5s ease-in-out infinite;
        }
        
        .animate-error-shake {
          animation: error-shake 0.6s ease-in-out;
        }
        
        .animate-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { transform: translateX(0); }
        }
        
        .animate-slide-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { transform: translateX(0); }
        }
        
        .animate-progress-fill {
          0% { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default EdgeniusQuiz;
