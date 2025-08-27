import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  Target,
  Brain,
  BookOpen,
  MessageCircle,
  BarChart3,
  Users,
  Play,
  Star,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import Navbar from "../Navbar";
import AiFlowSection from "./AiFlowSection";
import JourneySection from "./JourneySection";
import InfiniteTestimonialScroll from "./InfiniteFeature";

const FeatureListItem = ({
  icon,
  title,
  description,
  isVisible,
  delay = 0,
}) => {
  return (
    <div
      className={`feature-list-item transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-5">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#4285f4] text-white flex-shrink-0 shadow-lg shadow-blue-500/25">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1 text-gray-800">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MobilePhone = ({ scrollProgress }) => {
  const yOffset = scrollProgress * 0.08;
  const xRotation = Math.min(scrollProgress * 0.003, 3);
  const yRotation = Math.sin(scrollProgress * 0.0001) * -2;
  const scale = Math.max(1 - scrollProgress * 0.00005, 0.99);

  return (
    <div
      className="relative transition-transform duration-300 ease-out will-change-transform"
      style={{
        transform: `translateY(${yOffset}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-[480px] h-[920px] mx-auto">
        <div className="absolute inset-0 bg-black/40 rounded-[5.5rem] blur-3xl transform translate-y-12 scale-95"></div>
        <div className="relative w-full h-full bg-gray-900 rounded-[5.5rem] p-4 shadow-2xl border-2 border-gray-700">
          <div className="w-full h-full bg-white rounded-[5rem] relative overflow-hidden flex flex-col">
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full z-20 border border-gray-800"></div>
            <div className="absolute top-4 left-8 right-8 flex justify-between items-center text-gray-600 text-sm font-medium z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-2">
                <svg
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 2.5L11.5 0V5L14.5 2.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M11 0.5H10C9.4 0.5 9 1 9 1.5V6C9 6.5 9.4 7 10 7H11V0.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.5 2.5H7.5C6.9 2.5 6.5 3 6.5 3.5V6C6.5 6.5 6.9 7 7.5 7H8.5V2.5Z"
                    fill="currentColor"
                    fillOpacity="0.8"
                  ></path>
                  <path
                    d="M6 4H5C4.4 4 4 4.5 4 5V6C4 6.5 4.4 7 5 7H6V4Z"
                    fill="currentColor"
                    fillOpacity="0.6"
                  ></path>
                  <path
                    d="M3.5 5.5H2.5C1.9 5.5 1.5 6 1.5 6.5V7H3.5V5.5Z"
                    fill="currentColor"
                    fillOpacity="0.4"
                  ></path>
                </svg>
                <svg
                  width="25"
                  height="12"
                  viewBox="0 0 25 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="11"
                    rx="2.67"
                    stroke="currentColor"
                    strokeWidth="1"
                  ></rect>
                  <rect
                    x="23"
                    y="3.5"
                    width="1.5"
                    height="5"
                    rx="0.75"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="2"
                    y="2"
                    width="13.5"
                    height="8"
                    rx="1.33"
                    fill="currentColor"
                  ></rect>
                </svg>
              </div>
            </div>

            <div className="flex-grow pt-20 px-6 pb-24 overflow-y-auto">
              <div className="text-center mb-6">
                <h2 className="text-gray-800 text-lg font-semibold">
                  Edgenius AI Assistant
                </h2>
              </div>

              <div className="relative text-center mb-6">
                <div className="absolute -top-4 right-16 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-0 right-20 w-16 h-16 bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-full shadow-lg flex items-center justify-center transform -rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-white"
                  >
                    <path d="M12 8V4H8" />
                    <path d="M22 13a8 8 0 0 1-8 8H6a8 8 0 0 1-8-8V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2a4 4 0 0 1 4 4v2a4 4 0 0 1 4 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  Doubt-Solving Sessions
                </p>
                <h1 className="text-gray-800 text-7xl font-bold">3</h1>
              </div>

              <div className="text-center text-gray-600 text-sm mb-6">
                Next recommended lesson{" "}
                <span className="text-gray-800 font-semibold">
                  Feb 24, 2025
                </span>
              </div>

              <button className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white py-4 rounded-2xl font-semibold mb-8 hover:from-[#1557b7] hover:to-[#3367d6] transition-all shadow-lg shadow-blue-500/25">
                Talk to Edgenius AI Chatbot
              </button>

              <div>
                <h3 className="text-gray-800 font-bold text-xl mb-4">
                  AI-Generated Content
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50/80 rounded-2xl p-4 flex items-center space-x-4 border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800 font-semibold">
                        Quiz: Data Structures
                      </p>
                      <p className="text-gray-600 text-xs">
                        AI-tailored for your level
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1a73e8] font-semibold">Start Now</p>
                      <p className="text-gray-600 text-xs">Feb 12, 2025</p>
                    </div>
                  </div>
                  <div className="bg-gray-50/80 rounded-2xl p-4 flex items-center space-x-4 border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800 font-semibold">
                        Lesson: Algorithms
                      </p>
                      <p className="text-gray-600 text-xs">
                        Adaptive difficulty
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1a73e8] font-semibold">Continue</p>
                      <p className="text-gray-600 text-xs">Feb 13, 2025</p>
                    </div>
                  </div>
                  <div className="bg-gray-50/80 rounded-2xl p-4 flex items-center space-x-4 border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800 font-semibold">
                        Practice: Coding
                      </p>
                      <p className="text-gray-600 text-xs">
                        Personalized exercises
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1a73e8] font-semibold">Begin</p>
                      <p className="text-gray-600 text-xs">Feb 14, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-lg border-t border-gray-200 rounded-b-[5rem]">
              <div className="flex justify-around items-center h-full px-6">
                <div className="flex flex-col items-center space-y-1 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                  <span className="text-xs font-medium">Dashboard</span>
                </div>
                <div className="flex flex-col items-center space-y-1 text-white transition-colors p-4 -mt-10 bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-full shadow-lg shadow-blue-500/30 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center space-y-1 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs font-medium">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState(
    new Array(6).fill(false)
  );
  const featuresRef = useRef([]);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll }) => {
      setScrollY(scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -20% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(
          entry.target.getAttribute("data-feature-index") || "0"
        );
        if (entry.isIntersecting) {
          setVisibleFeatures((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }
      });
    }, observerOptions);

    featuresRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const allFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Learning Goals",
      description:
        "AI analyzes your skill level and creates custom learning paths tailored to your objectives and pace.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Assessments",
      description:
        "Dynamic quizzes adapt in real-time to challenge you at the perfect difficulty level.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Smart Content Generation",
      description:
        "Auto-generated lessons and examples that match your learning style and preferences.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Intelligent AI Mentor",
      description:
        "24/7 AI assistant provides instant answers, guidance, and personalized learning support.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Track progress with deep insights to optimize your learning journey and identify strengths.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Platform",
      description:
        "Connect with instructors and peers in an interactive, collaborative environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#1a73e8]/20 to-[#4285f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <Navbar />

      <section className="relative z-10 pt-12 pb-20">
        <div className="container mx-auto px-6 mt-20">
          <div className="relative z-20 text-center mb-32">
            <h1 className="text-gray-800 text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Transform Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#4285f4]">
                Learning Journey
              </span>
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
              Experience the future of education with Edgenius - an AI-powered
              platform that creates personalized learning paths, adaptive
              assessments, and intelligent mentoring for accelerated growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white hover:from-[#1557b7] hover:to-[#3367d6] text-xl px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40">
                Start Learning Today
              </button>
              <button className="border-2 border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white text-xl px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 flex items-center space-x-3 group">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-x-12 items-start"
            id="features"
          >
            <div className="lg:text-left mt-50 space-y-16 pt-24">
              {allFeatures.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) featuresRef.current[index] = el;
                  }}
                  data-feature-index={index}
                >
                  <FeatureListItem
                    {...feature}
                    isVisible={visibleFeatures[index]}
                    delay={index * 150}
                  />
                </div>
              ))}
            </div>

            <div
              className="lg:col-span-1 sticky top-24 h-[calc(100dvh-6rem)] flex items-center justify-center my-16 lg:my-0"
              style={{ perspective: "2000px" }}
            >
              <MobilePhone scrollProgress={scrollY} />
            </div>

            <div className="space-y-16 mt-50 pt-24">
              {allFeatures.slice(3, 6).map((feature, index) => (
                <div
                  key={index + 3}
                  ref={(el) => {
                    if (el) featuresRef.current[index + 3] = el;
                  }}
                  data-feature-index={index + 3}
                >
                  <FeatureListItem
                    {...feature}
                    isVisible={visibleFeatures[index + 3]}
                    delay={index * 150}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-32 relative z-10">
            <div className="flex items-center justify-center space-x-6 mb-10 flex-wrap gap-6">
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-200 hover:bg-white transition-colors shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-800 font-bold text-lg">4.9 ★</div>
                  <div className="text-gray-600 text-sm">AI Learning</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-200 hover:bg-white transition-colors shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-800 font-bold text-lg">15K+</div>
                  <div className="text-gray-600 text-sm">Active Students</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-200 hover:bg-white transition-colors shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-800 font-bold text-lg">
                    Enterprise
                  </div>
                  <div className="text-gray-600 text-sm">Ready</div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-center space-x-8 bg-white/90 backdrop-blur-xl rounded-3xl p-8 flex-wrap gap-6 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#1a73e8] flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  No setup required
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#1a73e8] flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  AI-powered learning
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#1a73e8] flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  Instant progress tracking
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#1a73e8] flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  24/7 AI mentoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800">
              From{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#4285f4]">
                Problem
              </span>{" "}
              to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#4285f4]">
                Solution
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI engine analyzes learning challenges and delivers
              intelligent, personalized solutions to accelerate growth and
              understanding.
            </p>
          </div>

          <div className="p-4 rounded-4xl">
            <AiFlowSection />
          </div>

          <div className="p-4 rounded-4xl">
            <JourneySection />
          </div>

          <div className="p-4 rounded-4xl">
            <InfiniteTestimonialScroll />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
