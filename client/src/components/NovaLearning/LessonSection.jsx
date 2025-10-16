// components/learning/LessonSection.jsx
import React, { useState } from 'react';
import { BookOpen, Lightbulb, Target, Zap, Code, TrendingUp, CheckCircle, ChevronDown, ChevronUp, Sparkles, FileText, BookMarked, AlertCircle, Play } from 'lucide-react';

const LessonSection = ({ lessons }) => {
  const [expandedSection, setExpandedSection] = useState(0);

  const getSectionIcon = (sectionTitle) => {
    const title = sectionTitle.toLowerCase();
    if (title.includes('introduction')) return BookOpen;
    if (title.includes('concept') || title.includes('core')) return Lightbulb;
    if (title.includes('weak') || title.includes('addressing')) return Target;
    if (title.includes('advanced')) return Zap;
    if (title.includes('exercise') || title.includes('practical') || title.includes('project')) return Code;
    if (title.includes('best') || title.includes('tip')) return TrendingUp;
    if (title.includes('conclusion') || title.includes('summary')) return CheckCircle;
    if (title.includes('appendix') || title.includes('glossary') || title.includes('reference')) return BookMarked;
    return Sparkles;
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      // Split by newlines and render paragraphs
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      if (paragraphs.length > 1) {
        return paragraphs.map((para, idx) => (
          <p key={idx} className="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
            {para}
          </p>
        ));
      }
      
      // Check if it contains bullet points
      if (content.includes('\n-') || content.includes('\n•')) {
        const lines = content.split('\n').filter(line => line.trim());
        const listItems = [];
        const textItems = [];
        
        lines.forEach(line => {
          if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
            listItems.push(line.replace(/^[-•]\s*/, '').trim());
          } else if (line.trim()) {
            textItems.push(line);
          }
        });
        
        return (
          <>
            {textItems.length > 0 && (
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
                {textItems.join(' ')}
              </p>
            )}
            {listItems.length > 0 && (
              <ul className="space-y-2.5 mt-3">
                {listItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-2.5 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        );
      }
      
      return <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{content}</p>;
    }
    
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2.5">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-2.5 flex-shrink-0"></div>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    return null;
  };

  // Get lesson data from response structure
  const lessonData = lessons.response || lessons;
  const docBody = lessonData.doc_body || [];

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white/20 dark:border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-indigo-950/50 dark:to-purple-950/50 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 flex-shrink-0">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {lessonData.doc_name || 'Personalized Learning Guide'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {lessonData.doc_desc || 'A comprehensive lesson plan tailored to your learning needs'}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="p-8 space-y-4">
        {docBody.length > 0 ? (
          docBody.map((sectionData, sectionIdx) => {
            const SectionIcon = getSectionIcon(sectionData.section);
            const isExpanded = expandedSection === sectionIdx;
            const sectionContent = sectionData.content || [];
            
            return (
              <div key={sectionIdx} className="group">
                {/* Section Header */}
                <button
                  onClick={() => setExpandedSection(isExpanded ? -1 : sectionIdx)}
                  className="w-full"
                >
                  <div className={`
                    flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300
                    ${isExpanded 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-400 dark:border-blue-700 shadow-xl' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg'
                    }
                  `}>
                    <div className="flex items-center gap-4">
                      <div className={`
                        p-3 rounded-xl transition-all duration-300
                        ${isExpanded 
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg' 
                          : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                        }
                      `}>
                        <SectionIcon className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className={`
                          font-bold text-xl
                          ${isExpanded ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}
                        `}>
                          {sectionData.section}
                        </h3>
                        {sectionContent.length > 0 && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {sectionContent.length} {sectionContent.length === 1 ? 'subsection' : 'subsections'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className={`
                      p-2.5 rounded-xl transition-all
                      ${isExpanded 
                        ? 'bg-blue-600/20 dark:bg-blue-400/20' 
                        : 'bg-slate-100 dark:bg-slate-700'
                      }
                    `}>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="mt-5 ml-6 space-y-5 animate-fadeIn">
                    {sectionContent.map((subsection, subIdx) => {
                      // Handle different content structures
                      const subsectionTitle = subsection.subsection;
                      const subsectionContent = subsection.content;
                      
                      return (
                        <div key={subIdx} className="pl-6 border-l-4 border-blue-200 dark:border-blue-800">
                          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
                            {/* Subsection Title */}
                            {subsectionTitle && (
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                                {subsectionTitle}
                              </h4>
                            )}
                            
                            {/* Content */}
                            {subsectionContent && (
                              <div className="prose prose-slate dark:prose-invert max-w-none">
                                {renderContent(subsectionContent)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-950/30 rounded-full mb-4">
              <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Lesson Content Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              The lesson content is being prepared. Please try again shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonSection;
