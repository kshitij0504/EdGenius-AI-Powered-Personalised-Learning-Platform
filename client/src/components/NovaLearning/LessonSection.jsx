// components/learning/LessonSection.jsx
import React, { useState } from 'react';

const LessonSection = ({ lessons, darkMode = false }) => {
  console.log('Lesson Data:', lessons);
  
  const [expandedSection, setExpandedSection] = useState(0);

  // Theme classes
  const bgMain = darkMode ? 'bg-black' : 'bg-white';
  const textMain = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderMain = darkMode ? 'border-gray-800' : 'border-gray-100';
  const cardBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-200';

  // Section icons
  const getSectionIcon = (sectionTitle) => {
    const title = sectionTitle.toLowerCase();
    
    if (title.includes('introduction')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
    }
    if (title.includes('concept') || title.includes('core')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    }
    if (title.includes('weak') || title.includes('addressing')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="9" />
          <circle cx="11" cy="11" r="5" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    }
    if (title.includes('advanced')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    }
    if (title.includes('exercise') || title.includes('practical') || title.includes('project')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      );
    }
    if (title.includes('best') || title.includes('tip')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" />
        </svg>
      );
    }
    if (title.includes('conclusion') || title.includes('summary')) {
      return (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    }
    // Default icon
    return (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h6" />
      </svg>
    );
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p className={`${textSub} leading-relaxed whitespace-pre-line`}>{content}</p>;
    }
    return null;
  };

  return (
    <div className={`${bgMain} rounded-3xl shadow-2xl border ${borderMain} transition-colors duration-300`}>
      {/* Header */}
      <div className={`p-8 border-b ${borderMain}`}>
        <h2 className={`text-2xl font-extrabold ${textMain} mb-4 flex items-center gap-3`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" fill="#2563eb" />
            <text x="6" y="19" fill="#fff" fontSize="12" fontWeight="bold">AI</text>
          </svg>
          {lessons.doc_name || "Nova's Personalized Lessons"}
        </h2>
        {lessons.doc_desc && (
          <p className={`${textSub} text-sm`}>{lessons.doc_desc}</p>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Section Navigation */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold ${textMain} mb-4`}>Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessons.doc_body.map((section, index) => (
              <button
                key={index}
                onClick={() => setExpandedSection(index)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-3 ${
                  expandedSection === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-md'
                    : `${cardBorder} hover:border-blue-300 hover:${cardBg}`
                }`}
              >
                <div className={expandedSection === index ? 'text-blue-600' : textSub}>
                  {getSectionIcon(section.section)}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${expandedSection === index ? 'text-blue-600' : textSub}`}>
                    {section.section}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div className="space-y-6">
          {lessons.doc_body[expandedSection] && (
            <>
              <div className={`p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl shadow-md border ${borderMain}`}>
                <h3 className={`text-2xl font-bold ${textMain} mb-4`}>
                  {lessons.doc_body[expandedSection].section}
                </h3>
              </div>

              {/* Render subsections */}
              {Array.isArray(lessons.doc_body[expandedSection].content) ? (
                <div className="space-y-6">
                  {lessons.doc_body[expandedSection].content.map((item, idx) => {
                    // Handle different content structures
                    if (typeof item === 'string') {
                      return (
                        <div key={idx} className={`p-6 ${cardBg} border ${cardBorder} rounded-xl`}>
                          {renderContent(item)}
                        </div>
                      );
                    }
                    
                    if (item.subsection) {
                      return (
                        <div key={idx} className={`border ${cardBorder} rounded-xl overflow-hidden`}>
                          <div className={`p-4 ${cardBg} border-b ${cardBorder}`}>
                            <h4 className={`text-lg font-semibold ${textMain} flex items-center gap-2`}>
                              <svg width="18" height="18" fill="currentColor" className="text-blue-500">
                                <circle cx="9" cy="9" r="8" />
                              </svg>
                              {item.subsection}
                            </h4>
                          </div>
                          <div className="p-6">
                            {renderContent(item.content)}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ) : (
                <div className={`p-6 ${cardBg} border ${cardBorder} rounded-xl`}>
                  {renderContent(lessons.doc_body[expandedSection].content)}
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-10 flex justify-between items-center">
          <button
            onClick={() => setExpandedSection(prev => Math.max(0, prev - 1))}
            disabled={expandedSection === 0}
            className={`px-6 py-3 border ${borderMain} rounded-xl font-medium ${textMain} hover:${cardBg} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2`}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6l-6 6 6 6" />
            </svg>
            Previous Section
          </button>

          <span className={`${textSub} text-sm font-medium`}>
            {expandedSection + 1} of {lessons.doc_body.length}
          </span>

          <button
            onClick={() => setExpandedSection(prev => Math.min(lessons.doc_body.length - 1, prev + 1))}
            disabled={expandedSection === lessons.doc_body.length - 1}
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2`}
          >
            Next Section
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonSection;
