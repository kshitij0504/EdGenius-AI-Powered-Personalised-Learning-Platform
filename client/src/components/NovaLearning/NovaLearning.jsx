// components/NovaLearning.jsx
import React, { useState, useContext } from 'react';
import { OrchestratorContext } from '../../context/OrchestratorContext';
import TopicSelectionCard from './TopicSelection';
import QuizSection from './QuizSection';
import AnalysisSection from './AnalysisSection';
import LessonSection from './LessonSection';
import ResourceSection from './ResourceSection';
import { Sparkles, Target, ClipboardCheck, TrendingUp, CheckCircle2, Brain } from 'lucide-react';

const NovaLearning = () => {
  const { orchestrateAction, loading } = useContext(OrchestratorContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [learningData, setLearningData] = useState({
    quiz: null,
    userAnswers: null,
    analysis: null,
    lessons: null,
    resources: null
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');

  const steps = [
    { id: 1, name: 'Select Topic', icon: Target, description: 'Choose your learning path' },
    { id: 2, name: 'Take Quiz', icon: ClipboardCheck, description: 'Test your knowledge' },
    { id: 3, name: 'Get Analysis', icon: TrendingUp, description: 'Understand your strengths' },
    { id: 4, name: 'Learn & Grow', icon: Sparkles, description: 'Personalized lessons' }
  ];

  const generateQuiz = async () => {
    if (!selectedTopic.trim()) return;
    try {
      const response = await orchestrateAction('generate_quiz', { topic: selectedTopic });
      setLearningData(prev => ({ ...prev, quiz: response }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  const submitQuiz = async (answers) => {
    setLearningData(prev => ({ ...prev, userAnswers: answers }));
    try {
      const analysisResponse = await orchestrateAction('analyze_quiz', {
        quiz: learningData.quiz,
        user_answers: answers
      });
      setLearningData(prev => ({ ...prev, analysis: analysisResponse }));

      const lessonsResponse = await orchestrateAction('generate_lessons', {
        user_id: 'current_user',
        weak_areas: analysisResponse.weak_areas,
        skill_level: skillLevel,
        topic: selectedTopic
      });
      setLearningData(prev => ({ ...prev, lessons: lessonsResponse }));

      const resourcesResponse = await orchestrateAction('curate_content', {
        topics: [selectedTopic]
      });
      setLearningData(prev => ({ ...prev, resources: resourcesResponse }));

      setCurrentStep(4);
    } catch (error) {
      console.error('Error processing quiz:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-500/5 dark:via-indigo-500/5 dark:to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-50 animate-pulse"></div>
              <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 relative" strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Nova Learning
            </h1>
          </div>
          <p className="text-center text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nova adapts to your learning style, identifies your strengths and weaknesses, and creates personalized lessons to accelerate your growth.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-[22px] left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto max-w-4xl"></div>
          {/* Active Progress Bar */}
          <div 
            className="absolute top-[22px] left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out mx-auto max-w-4xl"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative flex justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Step Circle */}
                  <div className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10
                    ${isActive ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50 scale-110' : ''}
                    ${isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50' : ''}
                    ${!isActive && !isCompleted ? 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700' : ''}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-semibold ${isActive || isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <TopicSelectionCard
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            skillLevel={skillLevel}
            setSkillLevel={setSkillLevel}
            onGenerateQuiz={generateQuiz}
            loading={loading}
          />
        )}

        {currentStep === 2 && learningData.quiz && (
          <QuizSection 
            quiz={learningData.quiz} 
            onSubmit={submitQuiz}
            loading={loading}
          />
        )}

        {currentStep === 4 && learningData.analysis && (
          <div className="space-y-8">
            <AnalysisSection 
              analysis={learningData.analysis}
              onStartLearning={() => {}}
            />
            {learningData.lessons && (
              <LessonSection lessons={learningData.lessons} />
            )}
            {learningData.resources && (
              <ResourceSection 
                resources={learningData.resources}
                topic={selectedTopic}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NovaLearning;
