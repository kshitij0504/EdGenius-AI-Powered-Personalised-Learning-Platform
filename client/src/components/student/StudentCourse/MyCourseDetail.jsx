import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  IoArrowBack, 
  IoPlayCircleOutline, 
  IoBookOutline, 
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoTrophyOutline,
  IoSpeedometerOutline,
  IoStarOutline,
  IoDownloadOutline,
  IoShareSocialOutline
} from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import StudentLayout from '../StudentLayout';
import { useCourses } from '../../../context/MyCourseContextProvider';
import progressAPI from './progressApi';

const MyCourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getCourseBySlug, loading } = useCourses();
  
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const result = await getCourseBySlug(slug);
        if (result.success) {
          const courseData = result.data;
          setCourse(courseData);
          
          // Set first lesson as default
          if (courseData.modules && courseData.modules.length > 0) {
            const firstModule = courseData.modules[0];
            if (firstModule.lessons && firstModule.lessons.length > 0) {
              const firstLesson = firstModule.lessons[0];
              setCurrentLesson(firstLesson);
              setActiveModule(firstModule.id);
              
              // Load video progress for first lesson
              await loadVideoProgress(firstLesson.id);
            }
          }
          
          // Fetch progress
          try {
            const progressResult = await progressAPI.getCourseProgress(courseData.id);
            console.log('Course progress:', progressResult);
            setProgress(progressResult);
            
            // Extract completed lessons from progress data
            if (progressResult.modules) {
              const completed = new Set();
              progressResult.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                  if (lesson.completed) {
                    completed.add(lesson.id);
                  }
                });
              });
              setCompletedLessons(completed);
            }
          } catch (progressError) {
            console.log('Progress data not available:', progressError);
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourseData();
  }, [slug, getCourseBySlug]);

  // Load video progress for a lesson
  const loadVideoProgress = async (lessonId) => {
    try {
      const progress = await progressAPI.getVideoProgress(lessonId);
      setVideoProgress(prev => ({
        ...prev,
        [lessonId]: progress
      }));
    } catch (error) {
      console.error('Error loading video progress:', error);
    }
  };

  const handleLessonSelect = async (lesson, moduleId) => {
    setIsVideoLoading(true);
    setCurrentLesson(lesson);
    setActiveModule(moduleId);
    setActiveTab('overview');
    
    // Load video progress for selected lesson
    await loadVideoProgress(lesson.id);
    
    // Simulate video loading delay
    setTimeout(() => {
      setIsVideoLoading(false);
    }, 500);
  };

  // Handle video time update
  const handleVideoTimeUpdate = async (e) => {
    if (!currentLesson) return;
    
    const video = e.target;
    const currentTime = video.currentTime;
    const duration = video.duration;
    const progress = (currentTime / duration) * 100;

    // Update progress every 5 seconds
    if (Math.floor(currentTime) % 5 === 0) {
      try {
        await progressAPI.updateVideoProgress(currentLesson.id, {
          currentTime,
          duration,
          videoProgress: progress,
          watchedSegments: [] // You can track segments if needed
        });
      } catch (error) {
        console.error('Error updating video progress:', error);
      }
    }
  };

  // Mark lesson complete
  const markLessonComplete = async (lessonId) => {
    if (isMarkingComplete) return;
    
    setIsMarkingComplete(true);
    try {
      await progressAPI.markLessonComplete(lessonId, true);
      setCompletedLessons(prev => new Set(prev.add(lessonId)));
      
      // Refresh progress data
      if (course) {
        const progressResult = await progressAPI.getCourseProgress(course.id);
        setProgress(progressResult);
      }
      
      // Show success message
      console.log('Lesson marked as complete');
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    } finally {
      setIsMarkingComplete(false);
    }
  };

  // Handle video ended - auto mark complete
  const handleVideoEnded = async () => {
    if (currentLesson && !completedLessons.has(currentLesson.id)) {
      await markLessonComplete(currentLesson.id);
    }
  };

  const getTotalLessons = () => {
    if (!course || !course.modules) return 0;
    return course.modules.reduce((total, module) => total + (module.lessons?.length || 0), 0);
  };

  const getProgressPercentage = () => {
    if (progress && progress.progressPercentage !== undefined) {
      return progress.progressPercentage;
    }
    
    const total = getTotalLessons();
    if (total === 0) return 0;
    return Math.round((completedLessons.size / total) * 100);
  };

  const getEstimatedTimeLeft = () => {
    const remainingLessons = getTotalLessons() - completedLessons.size;
    const minutes = remainingLessons * 15; // Assuming 15 min per lesson
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (!course) {
    return (
      <StudentLayout>
        <div className="text-center py-20">
          <div className="mb-8">
            <IoBookOutline className={`text-8xl mx-auto mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Course not found</h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>The course you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/my-courses')}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <IoArrowBack className="mr-2" />
            Back to My Courses
          </button>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className={`min-h-screen transition-all duration-700 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        {/* Enhanced Header */}
        <div className={`border-b backdrop-blur-md transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700 shadow-lg' 
            : 'bg-white/80 border-gray-200 shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/mycourse')}
                  className={`mr-6 p-3 rounded-xl transition-all duration-300 group ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IoArrowBack className="text-xl transform group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
                <div>
                  <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2`}>
                    {course.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <IoPersonOutline className={`text-sm mr-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        by {course.instructor?.name}
                      </p>
                    </div>
                    <div className={`text-sm px-3 py-1 rounded-full ${
                      isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {course.category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Progress: {getProgressPercentage()}%
                </div>
                <div className="flex space-x-2">
                  <button className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}>
                    <IoDownloadOutline className="text-lg" />
                  </button>
                  <button className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}>
                    <IoShareSocialOutline className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Video Player and Content */}
            <div className="lg:col-span-3">
              {/* Video Player */}
              <div className={`rounded-2xl overflow-hidden shadow-2xl mb-8 transition-all duration-500 ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200'
              }`}>
                {currentLesson ? (
                  <div className="aspect-video relative">
                    {isVideoLoading && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500 mb-4"></div>
                          <p className="text-white font-medium">Loading video...</p>
                        </div>
                      </div>
                    )}
                    <video
                      key={currentLesson.id}
                      className="w-full h-full object-cover"
                      controls
                      onLoadStart={() => setIsVideoLoading(true)}
                      onLoadedData={() => setIsVideoLoading(false)}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onEnded={handleVideoEnded}
                      {...(videoProgress[currentLesson.id]?.currentTime && {
                        currentTime: videoProgress[currentLesson.id].currentTime
                      })}
                    >
                      <source src={currentLesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Progress indicator on video */}
                    {videoProgress[currentLesson.id] && videoProgress[currentLesson.id].videoProgress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                          style={{ width: `${videoProgress[currentLesson.id].videoProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-center text-white">
                      <IoPlayCircleOutline className="text-8xl mx-auto mb-6 opacity-60" />
                      <h3 className="text-2xl font-bold mb-2">Select a lesson to start learning</h3>
                      <p className="text-gray-300">Choose from the course content on the right</p>
                    </div>
                  </div>
                )}
                
                {currentLesson && (
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className={`text-2xl font-bold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {currentLesson.title}
                        </h2>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <IoTimeOutline className="mr-1" />
                            <span>15 minutes</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <IoSpeedometerOutline className="mr-1" />
                            <span>Beginner</span>
                          </div>
                          {videoProgress[currentLesson.id]?.videoProgress > 0 && (
                            <div className="flex items-center text-sm text-blue-500 font-medium">
                              <span>{Math.round(videoProgress[currentLesson.id].videoProgress)}% watched</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {!completedLessons.has(currentLesson.id) ? (
                          <button
                            onClick={() => markLessonComplete(currentLesson.id)}
                            disabled={isMarkingComplete}
                            className={`px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                              isMarkingComplete ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {isMarkingComplete ? 'Marking...' : 'Mark Complete'}
                          </button>
                        ) : (
                          <div className="flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl">
                            <IoCheckmarkCircleOutline className="mr-2 text-xl" />
                            <span className="font-semibold">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Tabs */}
              <div className={`rounded-2xl shadow-xl transition-all duration-500 ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200'
              }`}>
                <div className={`flex border-b transition-all duration-500 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {['overview', 'content', 'notes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-4 text-sm font-semibold capitalize relative transition-all duration-300 ${
                        activeTab === tab
                          ? isDarkMode
                            ? 'text-blue-400'
                            : 'text-blue-600'
                          : isDarkMode
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab === 'overview' ? 'Course Overview' : tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="p-8">
                  {activeTab === 'overview' && (
                    <div>
                      <h3 className={`text-xl font-bold mb-6 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        About This Course
                      </h3>
                      <p className={`leading-relaxed mb-8 text-lg ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {course.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-blue-500 rounded-lg mr-3">
                              <IoBookOutline className="text-white text-xl" />
                            </div>
                            <span className={`font-bold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Modules
                            </span>
                          </div>
                          <span className={`text-2xl font-bold ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {course.modules?.length || 0}
                          </span>
                        </div>
                        
                        <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-purple-500 rounded-lg mr-3">
                              <IoPlayCircleOutline className="text-white text-xl" />
                            </div>
                            <span className={`font-bold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Lessons
                            </span>
                          </div>
                          <span className={`text-2xl font-bold ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {getTotalLessons()}
                          </span>
                        </div>
                        
                        <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-green-500 rounded-lg mr-3">
                              <IoCheckmarkCircleOutline className="text-white text-xl" />
                            </div>
                            <span className={`font-bold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Completed
                            </span>
                          </div>
                          <span className={`text-2xl font-bold ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}>
                            {completedLessons.size}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'content' && currentLesson && (
                    <div>
                      <h3 className={`text-xl font-bold mb-6 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Lesson Content
                      </h3>
                      <div className={`prose prose-lg max-w-none ${
                        isDarkMode ? 'prose-invert' : 'prose-gray'
                      }`}>
                        <ReactMarkdown
                          components={{
                            code({node, inline, className, children, ...props}) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={tomorrow}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-xl shadow-lg"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={`${className} px-2 py-1 rounded bg-gray-100 dark:bg-gray-800`} {...props}>
                                  {children}
                                </code>
                              );
                            }
                          }}
                        >
                          {currentLesson.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'notes' && (
                    <div>
                      <h3 className={`text-xl font-bold mb-6 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        My Notes
                      </h3>
                      <textarea
                        placeholder="Take notes while watching the course..."
                        className={`w-full h-80 p-6 rounded-xl border-2 resize-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                      />
                      <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Save Notes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Enhanced Course Progress */}
              <div className={`rounded-2xl p-8 shadow-xl transition-all duration-500 ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3">
                      <IoTrophyOutline className="text-white text-xl" />
                    </div>
                    <h3 className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Progress
                    </h3>
                  </div>
                  <span className={`text-2xl font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {getProgressPercentage()}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-4 mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${getProgressPercentage()}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {completedLessons.size} of {getTotalLessons()} lessons completed
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Estimated time left
                    </span>
                    <span className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {getEstimatedTimeLeft()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Instructor Info */}
              <div className={`rounded-2xl p-8 shadow-xl transition-all duration-500 ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200'
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Instructor
                </h3>
                <div className="flex items-start">
                  <div className="relative">
                    <img
                      src={course.instructor?.profilePhoto}
                      alt={course.instructor?.name}
                      className="w-16 h-16 rounded-xl mr-4 object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-lg mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {course.instructor?.name}
                    </p>
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Expert Instructor
                    </p>
                    <div className="flex items-center">
                      <IoStarOutline className="text-yellow-500 mr-1" />
                      <span className={`text-sm font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        4.9 (2.1k reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Course Content */}
              <div className={`rounded-2xl shadow-xl transition-all duration-500 ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200'
              }`}>
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <IoBookOutline className="mr-3 text-blue-500" />
                    Course Content
                  </h3>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto">
                  {course.modules && course.modules.length > 0 ? (
                    course.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div className={`p-6 ${
                          isDarkMode ? 'bg-gray-750' : 'bg-gray-50'
                        }`}>
                          <h4 className={`font-bold text-lg mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {module.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {module.lessons?.length || 0} lessons
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                            }`}>
                              Module {moduleIndex + 1}
                            </span>
                          </div>
                        </div>
                        
                        {module.lessons && module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            onClick={() => handleLessonSelect(lesson, module.id)}
                            className={`p-6 cursor-pointer transition-all duration-300 group ${
                              currentLesson?.id === lesson.id
                                ? isDarkMode
                                  ? 'bg-blue-900/30 border-l-4 border-blue-500'
                                  : 'bg-blue-50 border-l-4 border-blue-500'
                                : isDarkMode
                                  ? 'hover:bg-gray-700'
                                  : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <IoPlayCircleOutline className={`mr-3 text-lg ${
                                  completedLessons.has(lesson.id)
                                    ? 'text-green-500'
                                    : isDarkMode
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                }`} />
                                <div>
                                  <p className={`font-medium ${
                                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                  }`}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center space-x-3 text-sm">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                      Lesson {lessonIndex + 1}
                                    </span>
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                      <IoTimeOutline className="inline mr-1" />
                                      15 min
                                    </span>
                                  </div>
                                  {/* Show video progress percentage */}
                                  {videoProgress[lesson.id]?.videoProgress > 0 && videoProgress[lesson.id].videoProgress < 100 && (
                                    <div className="mt-2">
                                      <div className="w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-blue-500 transition-all duration-300"
                                          style={{ width: `${videoProgress[lesson.id].videoProgress}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {completedLessons.has(lesson.id) && (
                                <IoCheckmarkCircleOutline className="text-green-500 text-xl" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        No modules available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyCourseDetailPage;
