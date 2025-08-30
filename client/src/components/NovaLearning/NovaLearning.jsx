// components/NovaLearning.jsx
import React, { useState, useContext } from 'react';
import { OrchestratorContext } from '../../context/OrchestratorContext';
import TopicSelectionCard from './TopicSelection';
import QuizSection from './QuizSection';
import AnalysisSection from './AnalysisSection';
import LessonSection from './LessonSection';
import ResourceSection from './ResourceSection';

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
    { id: 1, name: 'Generate Quiz', icon: '🎯', status: currentStep >= 1 ? 'complete' : 'upcoming' },
    { id: 2, name: 'Take Quiz', icon: '📝', status: currentStep >= 2 ? 'complete' : 'upcoming' },
    { id: 3, name: 'Get Analysis', icon: '📊', status: currentStep >= 3 ? 'complete' : 'upcoming' },
    { id: 4, name: 'Learn & Grow', icon: '🚀', status: currentStep >= 4 ? 'complete' : 'upcoming' }
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
      console.log(analysisResponse);
      
      setLearningData(prev => ({ ...prev, analysis: analysisResponse }));
      
      // Generate lessons based on weak areas
      const lessonsResponse = await orchestrateAction('generate_lessons', {
        user_id: 'current_user', // Replace with actual user ID
        weak_areas: analysisResponse.weak_areas,
        skill_level: skillLevel,
        topic: selectedTopic
      });
      setLearningData(prev => ({ ...prev, lessons: lessonsResponse }));
      
      // Fetch curated content
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <div className="ml-4 text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Meet <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Nova</span>
              </h1>
              <p className="text-lg text-gray-600">Your Personal AI Learning Companion</p>
            </div>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Nova adapts to your learning style, identifies your strengths and weaknesses, 
            and creates personalized lessons to accelerate your growth.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-semibold transition-all duration-300 ${
                  step.status === 'complete' 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : currentStep === step.id
                    ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.status === 'complete' ? '✓' : step.icon}
                </div>
                <div className="ml-3 text-left">
                  <p className={`text-sm font-medium ${
                    step.status === 'complete' ? 'text-green-600' : 
                    currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    step.status === 'complete' ? 'text-green-500' : 
                    currentStep === step.id ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-4 rounded ${
                    step.status === 'complete' ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
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

          {currentStep >= 3 && learningData.analysis && (
            <div className="space-y-8">
              <AnalysisSection analysis={learningData.analysis} />
              
              {currentStep === 4 && learningData.lessons && (
                <>
                  <LessonSection lessons={learningData.lessons} />
                  {learningData.resources && (
                    <ResourceSection resources={learningData.resources} topic={selectedTopic} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovaLearning;
