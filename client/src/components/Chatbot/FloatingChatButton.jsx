import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';

const FloatingChatButton = ({ onClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Periodic pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
          isHovered ? 'scale-110 shadow-xl' : 'hover:scale-105'
        } ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
        }`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        aria-label="Open Edgenius AI Chat"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-full h-full relative z-10">
          <MessageCircle 
            className={`w-7 h-7 text-white transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`} 
          />
        </div>
        
        {/* Online Status Indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <div className={`w-2 h-2 bg-white rounded-full ${pulse ? 'animate-ping' : ''}`}></div>
        </div>
        
        {/* Hover Ring Effect */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-300 transition-all duration-300 ${
          isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
        }`}></div>
      </button>
    </div>
  );
};

export default FloatingChatButton;
