// components/learning/TopicSelectionCard.jsx
import React from 'react';
import { Sparkles, Code, Rocket, Coffee, Zap, Server, Brain, ArrowRight, Loader2 } from 'lucide-react';

const TopicSelectionCard = ({ selectedTopic, setSelectedTopic, skillLevel, setSkillLevel, onGenerateQuiz, loading }) => {
  const popularTopics = [
    { name: 'Python Fundamentals', icon: Code, color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30', textColor: 'text-emerald-700 dark:text-emerald-400', borderColor: 'border-emerald-200 dark:border-emerald-800' },
    { name: 'JavaScript ES6+', icon: Zap, color: 'from-yellow-500 to-orange-600', bgColor: 'bg-yellow-50 dark:bg-yellow-950/30', textColor: 'text-yellow-700 dark:text-yellow-400', borderColor: 'border-yellow-200 dark:border-yellow-800' },
    { name: 'React Development', icon: Rocket, color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-50 dark:bg-blue-950/30', textColor: 'text-blue-700 dark:text-blue-400', borderColor: 'border-blue-200 dark:border-blue-800' },
    { name: 'DSA with Java', icon: Coffee, color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50 dark:bg-orange-950/30', textColor: 'text-orange-700 dark:text-orange-400', borderColor: 'border-orange-200 dark:border-orange-800' },
    { name: 'Node.js Backend', icon: Server, color: 'from-green-600 to-teal-600', bgColor: 'bg-green-50 dark:bg-green-950/30', textColor: 'text-green-700 dark:text-green-400', borderColor: 'border-green-200 dark:border-green-800' },
    { name: 'Machine Learning', icon: Brain, color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50 dark:bg-purple-950/30', textColor: 'text-purple-700 dark:text-purple-400', borderColor: 'border-purple-200 dark:border-purple-800' }
  ];

  const skillLevels = [
    { value: 'Beginner', icon: '🌱', description: 'New to this topic', color: 'from-green-500 to-emerald-600' },
    { value: 'Intermediate', icon: '🚀', description: 'Some experience', color: 'from-blue-500 to-indigo-600' },
    { value: 'Advanced', icon: '🎯', description: 'Looking to master', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Glass Card Container */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white/20 dark:border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="relative p-8 pb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/50 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Start Your Learning Journey
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-12">
            Choose a topic and Nova will create a personalized experience
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Popular Topics Grid */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Popular Topics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularTopics.map((topic) => {
                const Icon = topic.icon;
                const isSelected = selectedTopic === topic.name;
                
                return (
                  <button
                    key={topic.name}
                    onClick={() => setSelectedTopic(topic.name)}
                    className={`
                      group relative p-4 rounded-xl border-2 transition-all duration-300
                      ${isSelected 
                        ? `${topic.bgColor} ${topic.borderColor} shadow-lg shadow-${topic.textColor}/20 scale-105` 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2.5 rounded-lg transition-all duration-300
                        ${isSelected 
                          ? `bg-gradient-to-br ${topic.color} shadow-md` 
                          : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                        }
                      `}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`} />
                      </div>
                      <span className={`
                        font-semibold text-sm text-left
                        ${isSelected ? topic.textColor : 'text-slate-700 dark:text-slate-200'}
                      `}>
                        {topic.name}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Topic Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              Or Enter Custom Topic
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="e.g., Advanced React Patterns, Docker Basics..."
                className="w-full px-4 py-3.5 pl-12 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Skill Level Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Your Skill Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {skillLevels.map((level) => {
                const isSelected = skillLevel === level.value;
                
                return (
                  <button
                    key={level.value}
                    onClick={() => setSkillLevel(level.value)}
                    className={`
                      relative p-5 rounded-xl border-2 transition-all duration-300 text-left
                      ${isSelected 
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-400 dark:border-blue-600 shadow-lg shadow-blue-500/20' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div className="flex-1">
                        <p className={`font-semibold mb-0.5 ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                          {level.value}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {level.description}
                        </p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={onGenerateQuiz}
            disabled={!selectedTopic.trim() || loading}
            className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:shadow-none transition-all duration-300 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Quiz...
                </>
              ) : (
                <>
                  Generate Personalized Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectionCard;
