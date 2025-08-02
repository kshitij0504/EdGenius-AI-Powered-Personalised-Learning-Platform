// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, BrainCircuit, Lightbulb, TrendingUp, BookOpen, Repeat } from 'lucide-react';

// Import your API service functions
import { generateQuiz, analyzeQuiz } from '../services/quizService';

// --- THEME PALETTE ---
// Cream: #FFFBF0
// Deep Navy: #34495E
// Dark Slate: #4A6989
// Medium Blue: #5585AC
// Bright Blue: #90C8E8

//=====================================
// 1. GENERATING QUIZ - ANIMATION
//=====================================
const GeneratingQuizAnimation = () => (
    <motion.div
        key="generating"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="text-center p-8 flex flex-col items-center justify-center h-full"
    >
        <div className="relative w-48 h-48 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border-4 rounded-full"
                    style={{
                        borderColor: `rgba(144, 200, 232, ${0.3 + i * 0.2})`,
                        borderTopColor: '#5585AC',
                        width: 80 + i * 40,
                        height: 80 + i * 40,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 3 + i * 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
            <BrainCircuit className="text-[#34495E]" size={64} />
        </div>
        <h2 className="text-3xl font-bold text-[#34495E] mt-8">Forging Your Personalized Quiz...</h2>
        <p className="text-lg text-[#4A6989] mt-2">Our AI is analyzing the topic to create the perfect questions for you.</p>
    </motion.div>
);

//=====================================
// 2. QUIZ TAKER - INTERFACE
//=====================================
const QuizTaker = ({ quiz, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const currentQuestion = quiz[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quiz.length) * 100;

    const handleAnswerSelect = (option) => {
        setSelectedOption(option);
        setTimeout(() => {
            const updatedAnswers = [...userAnswers, option];
            setUserAnswers(updatedAnswers);
            setSelectedOption(null);

            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                onComplete(updatedAnswers);
            }
        }, 500); // Wait for feedback animation
    };

    return (
        <div className="p-8 md:p-12 w-full max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-[#90C8E8]/30 rounded-full h-2.5 mb-8">
                <motion.div
                    className="bg-[#5585AC] h-2.5 rounded-full"
                    initial={{ width: `${(currentQuestionIndex / quiz.length) * 100}%` }}
                    animate={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </div>

            {/* Question Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#34495E] text-center mb-2">
                        Question {currentQuestionIndex + 1} / {quiz.length}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#4A6989] text-center mb-10 min-h-[6rem]">{currentQuestion.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, i) => (
                            <motion.button
                                key={i}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={selectedOption}
                                className={`p-5 text-lg font-semibold text-left rounded-xl border-2 transition-all duration-300 w-full
                                  ${selectedOption === option ? (option === currentQuestion.answer ? 'bg-emerald-100 border-emerald-400' : 'bg-red-100 border-red-400')
                                    : 'bg-white/50 border-gray-200 hover:bg-[#90C8E8]/20 hover:border-[#5585AC]'}
                                `}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-[#34495E]">{option}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

//=====================================
// 3. QUIZ RESULTS - ANALYSIS DISPLAY
//=====================================
const QuizResults = ({ analysis, onReset }) => (
    <motion.div
        key="results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 w-full max-w-5xl mx-auto"
    >
        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-[#34495E]">Quiz Analysis Complete</h1>
            <p className="text-xl text-[#4A6989] mt-2">Here's a breakdown of your performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Score */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white text-center">
                <h3 className="text-lg font-bold text-[#4A6989] mb-4">Overall Score</h3>
                <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#90C8E8"
                            strokeWidth="3"
                        />
                        <motion.path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#34495E"
                            strokeWidth="3"
                            strokeDasharray={`${analysis.score_percentage}, 100`}
                            initial={{ strokeDasharray: `0, 100` }}
                            animate={{ strokeDasharray: `${analysis.score_percentage}, 100` }}
                            transition={{ duration: 1.5, ease: 'circOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-[#34495E]">{analysis.score_percentage}%</span>
                        <span className="text-md font-semibold text-[#4A6989]">{analysis.correct_answers}/{analysis.total_questions} correct</span>
                    </div>
                </div>
            </div>

            {/* Weak Areas & Recommendations */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white flex flex-col justify-center">
                <div>
                    <h3 className="text-lg font-bold text-[#4A6989] mb-4 flex items-center"><Lightbulb className="mr-2 text-[#5585AC]" /> Weak Areas</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {analysis.weak_areas.length > 0 ? analysis.weak_areas.map(area => (
                            <span key={area} className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">{area}</span>
                        )) : <p className="text-[#4A6989]">No specific weak areas found. Great job!</p>}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#4A6989] mb-4 flex items-center"><TrendingUp className="mr-2 text-[#5585AC]" /> Recommendations</h3>
                    <ul className="space-y-2">
                        {analysis.recommendations.map(rec => (
                            <li key={rec} className="text-[#34495E] font-medium flex items-start">
                                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-emerald-500 flex-shrink-0" /> {rec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Detailed Feedback */}
        <div>
            <h2 className="text-3xl font-bold text-[#34495E] mb-6 flex items-center"><BookOpen className="mr-3 text-[#5585AC]" /> Detailed Feedback</h2>
            <div className="space-y-4">
                {analysis.detailed_feedback.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-5 rounded-xl border-2 ${item.is_correct ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'}`}
                    >
                        <p className="font-bold text-[#34495E] mb-3">{index + 1}. {item.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                            <p className="font-medium text-sm">
                                <span className={`font-bold ${item.is_correct ? 'text-emerald-600' : 'text-red-600'}`}>Your Answer: </span>
                                {item.is_correct ?
                                    <CheckCircle className="inline w-4 h-4 mr-1 text-emerald-600" />
                                    : <XCircle className="inline w-4 h-4 mr-1 text-red-600" />}
                                {item.user_answer}
                            </p>
                            {!item.is_correct && (
                                <p className="font-medium text-sm"><span className="font-bold text-emerald-600">Correct Answer: </span>{item.correct_answer}</p>
                            )}
                        </div>
                        <div className="mt-3 pt-3 border-t-2 border-dashed border-gray-200">
                            <p className="text-sm text-[#4A6989] font-semibold">
                                <span className="font-bold">Explanation: </span>{item.explanation}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="text-center mt-12">
            <button onClick={onReset} className="bg-[#34495E] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#4A6989] transition-colors flex items-center mx-auto">
                <Repeat className="mr-2" /> Take Another Quiz
            </button>
        </div>
    </motion.div>
);

//=====================================
// 4. MAIN PAGE - STATE MANAGEMENT
//=====================================
export default function QuizPage() {
    const [status, setStatus] = useState('idle'); // 'idle', 'generating', 'taking', 'analyzing', 'results'
    const [topic, setTopic] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');

    const handleGenerateQuiz = async (e) => {
        e.preventDefault();
        if (!topic) return;
        setError('');
        setStatus('generating');
        try {
            const quizData = await generateQuiz(topic);
            if (quizData && quizData.length > 0) {
                setQuiz(quizData);
                setStatus('taking');
            } else {
                throw new Error("The generated quiz was empty. Please try a different topic.");
            }
        } catch (err) {
            setError(err.message);
            setStatus('idle');
        }
    };

    const handleQuizComplete = async (userAnswers) => {
        setStatus('analyzing'); // Can show another loading animation here if needed
        try {
            const analysisData = await analyzeQuiz(userAnswers, quiz);
            setAnalysis(analysisData);
            setStatus('results');
        } catch (err) {
            setError(err.message);
            setStatus('taking'); // Go back to quiz if analysis fails
        }
    };

    const resetQuiz = () => {
        setStatus('idle');
        setTopic('');
        setQuiz([]);
        setAnalysis(null);
        setError('');
    };

    return (
        <main className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-4">
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl font-extrabold text-[#34495E]">AI-Powered Quiz Generator</h1>
                            <p className="text-xl text-[#4A6989] mt-4 mb-8">Enter any topic to test your knowledge.</p>
                            <form onSubmit={handleGenerateQuiz} className="flex flex-col items-center gap-4">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., 'React Hooks' or 'Quantum Mechanics'"
                                    className="w-full max-w-lg p-4 text-lg border-2 border-[#90C8E8] rounded-lg focus:ring-2 focus:ring-[#5585AC] focus:outline-none transition"
                                />
                                <button
                                    type="submit"
                                    disabled={!topic}
                                    className="bg-[#34495E] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#4A6989] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Generate Quiz
                                </button>
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                            </form>
                        </motion.div>
                    )}

                    {(status === 'generating' || status === 'analyzing') && <GeneratingQuizAnimation />}

                    {status === 'taking' && <QuizTaker quiz={quiz} onComplete={handleQuizComplete} />}
                    
                    {status === 'results' && <QuizResults analysis={analysis} onReset={resetQuiz} />}
                </AnimatePresence>
            </div>
        </main>
    );
}