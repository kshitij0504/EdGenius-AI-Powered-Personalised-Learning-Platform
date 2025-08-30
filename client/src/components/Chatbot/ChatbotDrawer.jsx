import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  X,
  Send,
  MessageCircle,
  BookOpen,
  HelpCircle,
  FileText,
  TrendingUp,
  Loader2,
  User,
  Minimize2,
} from "lucide-react";
import { useSelector } from "react-redux";

const ChatbotDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userContext, setUserContext] = useState({
    current_course: "General Learning",
    learning_level: "beginner",
    learning_goals: "Improve programming skills",
  });
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const userId = user.id;
  console.log("User ID:", userId);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: "bot",
          content:
            "Welcome to Edgenius AI Tutor! I'm here to make your learning journey exceptional. What would you like to explore today?",
          id: "welcome-message",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    const newUserMessage = {
      type: "user",
      content: userMessage,
      id: Date.now(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        user_id: userId,
        message: userMessage,
      });

      if (response.data.success) {
        const botMessage = {
          type: "bot",
          content: response.data.response,
          id: Date.now() + 1,
          timestamp: new Date(),
          analysis: response.data.analysis,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || "Failed to get response");
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        content:
          "I apologize, but I encountered a technical issue. Please try again or contact our support team.",
        id: Date.now() + 1,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    {
      text: "Explain my current lesson",
      icon: BookOpen,
      description: "Get detailed explanations",
    },
    {
      text: "I need help with a concept",
      icon: HelpCircle,
      description: "Ask specific questions",
    },
    {
      text: "Generate a practice quiz",
      icon: FileText,
      description: "Test your knowledge",
    },
    {
      text: "Show my progress",
      icon: TrendingUp,
      description: "Track your learning",
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 z-50 w-full sm:w-[28rem] md:w-[32rem] lg:w-[36rem] h-full shadow-2xl transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col ${
        isDarkMode
          ? "bg-slate-900 border-l border-slate-700"
          : "bg-white border-l border-gray-200"
      }`}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${
          isDarkMode
            ? "border-slate-700 bg-slate-800"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center space-x-3">
          {/* Logo matching your design */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3
              className={`font-semibold text-xl ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Edgenius AI
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Online & Ready
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-2.5 rounded-lg transition-colors ${
              isDarkMode
                ? "hover:bg-slate-700 text-slate-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className={`p-2.5 rounded-lg transition-colors ${
              isDarkMode
                ? "hover:bg-slate-700 text-slate-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div
            className={`flex-1 overflow-y-auto px-6 py-6 space-y-5 min-h-0 ${
              isDarkMode ? "bg-slate-900" : "bg-gray-50"
            }`}
          >
            {/* Welcome Message & Quick Actions */}
            {messages.length === 1 && messages[0].id === "welcome-message" && (
              <div className="space-y-5 mb-6">
                {/* Welcome Card */}
                <div
                  className={`p-5 rounded-2xl border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-gray-200"
                  } shadow-sm`}
                >
                  <h4
                    className={`font-semibold mb-3 text-base ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    🎯 How can I help you learn?
                  </h4>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    I'm powered by advanced AI to provide personalized learning
                    assistance, explanations, and practice materials tailored to
                    your needs.
                  </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setInputMessage(action.text)}
                        className={`p-5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 text-left ${
                          isDarkMode
                            ? "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-600"
                            : "bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300"
                        } shadow-sm hover:shadow-md`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p
                          className={`text-sm font-medium mb-2 ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {action.text}
                        </p>
                        <p
                          className={`text-xs leading-relaxed ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {action.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] ${
                    message.type === "user" ? "order-1" : "order-2"
                  }`}
                >
                  <div
                    className={`px-5 py-4 rounded-2xl ${
                      message.type === "user"
                        ? "bg-blue-500 text-white"
                        : message.isError
                        ? isDarkMode
                          ? "bg-red-900/50 text-red-300 border border-red-700/50"
                          : "bg-red-50 text-red-700 border border-red-200"
                        : isDarkMode
                        ? "bg-slate-800 text-slate-100 border border-slate-700"
                        : "bg-white text-slate-900 border border-gray-200 shadow-sm"
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>

                    <div
                      className={`text-xs mt-3 ${
                        message.type === "user"
                          ? "text-blue-100"
                          : isDarkMode
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Message */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div
                  className={`px-5 py-4 rounded-2xl ${
                    isDarkMode
                      ? "bg-slate-800 text-slate-100 border border-slate-700"
                      : "bg-white text-slate-900 border border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className={`px-6 py-5 border-t flex-shrink-0 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question or learning request..."
                  disabled={isLoading}
                  rows={3}
                  className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm transition-colors ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      : "bg-gray-50 border-gray-300 text-slate-900 placeholder-slate-500"
                  }`}
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="p-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl transition-colors disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotDrawer;
