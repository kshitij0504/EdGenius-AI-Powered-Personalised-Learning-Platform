// components/learning/LessonSection.jsx
import React, { useState } from 'react';

const LessonSection = ({ lessons }) => {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedSection, setExpandedSection] = useState('introduction');

  const currentLesson = lessons.lesson_modules[selectedLesson];

  const sectionIcons = {
    introduction: '📚',
    theory: '🧠',
    implementation: '⚙️',
    examples: '💡',
    exercises: '🏋️',
    summary: '📋'
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          🚀 Nova's Personalized Lessons
        </h2>
        
        {/* Lesson Tabs */}
        <div className="flex space-x-4 overflow-x-auto">
          {lessons.lesson_modules.map((lesson, index) => (
            <button
              key={lesson.lesson_id}
              onClick={() => setSelectedLesson(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedLesson === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Lesson {lesson.lesson_number}: {lesson.concept}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {/* Lesson Info */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {currentLesson.content.introduction.title}
            </h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {currentLesson.estimated_duration}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{currentLesson.content.introduction.overview}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              📊 Difficulty: {currentLesson.difficulty_score}/5
            </span>
            <span className="flex items-center">
              🎯 Priority: {currentLesson.priority}
            </span>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(sectionIcons).map((section) => (
              <button
                key={section}
                onClick={() => setExpandedSection(section)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  expandedSection === section
                    ? 'border-blue-500 bg-blue-50 transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-1">{sectionIcons[section]}</div>
                <div className="text-xs font-medium capitalize">{section}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div className="mb-8">
          {expandedSection === 'introduction' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Why This Matters</h4>
                <p className="text-gray-700">{currentLesson.content.introduction.importance}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Real-World Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentLesson.content.introduction.real_world_applications.map((app, index) => (
                    <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <h5 className="font-semibold text-green-900 mb-2">{app.application}</h5>
                      <p className="text-sm text-green-700">{app.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {expandedSection === 'theory' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Definition</h4>
                <p className="text-gray-700 p-4 bg-gray-50 rounded-xl">{currentLesson.content.theory.definition}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Concepts</h4>
                <div className="space-y-4">
                  {currentLesson.content.theory.key_concepts.map((concept, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                      <h5 className="font-semibold text-gray-900 mb-2">{concept.title}</h5>
                      <p className="text-gray-700 mb-2">{concept.description}</p>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {concept.importance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {expandedSection === 'examples' && (
            <div className="space-y-6">
              {['basic', 'intermediate', 'advanced'].map((level) => (
                <div key={level}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 capitalize">{level} Examples</h4>
                  <div className="space-y-4">
                    {currentLesson.content.examples[level].map((example, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <h5 className="font-semibold text-gray-900">{example.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                        </div>
                        <div className="p-4">
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{example.code}</code>
                          </pre>
                          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500">
                            <p className="text-sm text-blue-800">{example.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {expandedSection === 'exercises' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Practice Problems</h4>
                <div className="space-y-4">
                  {currentLesson.content.exercises.practice_problems.map((problem, index) => (
                    <div key={problem.problem_id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold text-gray-900">{problem.title}</h5>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{problem.description}</p>
                      
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                        🚀 Start Practice Problem
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Mini Projects</h4>
                <div className="space-y-4">
                  {currentLesson.content.exercises.mini_projects.map((project, index) => (
                    <div key={project.project_id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h5>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h6 className="font-medium text-gray-900 mb-2">Requirements:</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {project.requirements.map((req, i) => (
                              <li key={i} className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-900 mb-2">Learning Goals:</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {project.learning_goals.map((goal, i) => (
                              <li key={i} className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                        🎯 Start Mini Project ({project.estimated_time})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">💻</div>
            <h4 className="font-semibold text-gray-900 mb-1">Code Playground</h4>
            <p className="text-sm text-gray-600">Try examples interactively</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">❓</div>
            <h4 className="font-semibold text-gray-900 mb-1">Quick Quiz</h4>
            <p className="text-sm text-gray-600">{currentLesson.interactive_elements.quiz.questions_count} questions</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">🎮</div>
            <h4 className="font-semibold text-gray-900 mb-1">Live Examples</h4>
            <p className="text-sm text-gray-600">{currentLesson.interactive_elements.live_examples.count} interactive demos</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonSection;
