import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import studyAnimation from "../../assets/SignupAnimation.json";

export default function SignInComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/studentdash");
    }, 2000);
  };

  const LeftPanel = () => (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#91C8E4] to-[#749BC2] relative overflow-hidden rounded-l-3xl">
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/15 rounded-full"></div>
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-[#FFFBDE]/30 rounded-full"></div>
      <div className="flex flex-1 justify-center items-center p-8 relative z-10">
        <Lottie
          animationData={studyAnimation}
          loop={true}
          autoplay={true}
          className="w-[32rem] h-[32rem]"
        />
      </div>
    </div>
  );
  const RightPanel = () => {
    return (
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-right mb-8">
            <select className="text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer">
              <option>English (USA)</option>
            </select>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#91C8E4] focus:border-transparent outline-none transition-all duration-300 hover:bg-gray-100"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#91C8E4] focus:border-transparent outline-none transition-all duration-300 hover:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-[#4682A9] bg-gray-100 border-gray-300 rounded focus:ring-[#91C8E4] focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-[#4682A9] hover:text-[#749BC2] underline transition-colors duration-300"
              >
                Forgot Password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[#4682A9] text-white hover:bg-[#749BC2] shadow-lg ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  SIGNING IN...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or Sign In With
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button className="w-12 h-12 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.07 0 5.84 1.06 8.02 2.8l5.98-5.98C33.34 2.39 28.94 0 24 0 14.95 0 7.21 5.72 3.64 13.99l7.15 5.56C12.69 13.58 17.95 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.68-.15-3.3-.44-4.86H24v9.2h12.46c-.54 2.88-2.23 5.31-4.7 6.96l7.41 5.76C43.96 37.02 46.1 31.21 46.1 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.79 28.19a14.6 14.6 0 010-8.37L3.64 14.25a24.02 24.02 0 000 19.5l7.15-5.56z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 11.95-2.15 15.94-5.86l-7.41-5.76c-2.06 1.38-4.71 2.19-8.53 2.19-6.05 0-11.31-4.08-13.21-9.61l-7.15 5.56C7.21 42.28 14.95 48 24 48z"
                />
              </svg>
            </button>

            <button className="w-12 h-12 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <button className="w-12 h-12 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
              <svg
                className="w-5 h-5 text-blue-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>

            <button className="w-12 h-12 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a
              href="/signup"
              className="text-[#4682A9] hover:text-[#749BC2] font-medium transition-colors duration-300 hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen ml-60 bg-gray-50 flex">
      <div
        className={`w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } lg:flex lg:m-8`}
      >
        <LeftPanel />
        <RightPanel />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import studyAnimation from "../../assets/SignupAnimation.json";

// export default function SignInComponent() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubmit = async () => {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate("/studentdash");
//     }, 2000);
//   };

//   const LeftPanel = () => (
//     <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden rounded-l-3xl">
//       <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
//       <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/15 rounded-full"></div>
//       <div className="absolute top-1/2 right-20 w-8 h-8 bg-[var(--color-edgenius-bg-lightest)]/30 rounded-full"></div>
//       <div className="flex flex-1 justify-center items-center p-8 relative z-10">
//         <Lottie
//           animationData={studyAnimation}
//           loop={true}
//           autoplay={true}
//           className="w-[32rem] h-[32rem]"
//         />
//       </div>
//     </div>
//   );

//   const RightPanel = () => {
//     return (
//       <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
//         <div className="w-full max-w-md">
//           <div className="text-right mb-8">
//             <select className="text-sm text-[var(--auth-text-secondary)] bg-transparent border-none outline-none cursor-pointer">
//               <option>English (USA)</option>
//             </select>
//           </div>

//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-[var(--auth-text-primary)] mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-[var(--auth-text-secondary)]">
//               Please sign in to your account
//             </p>
//           </div>

//           <div className="space-y-6">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Address"
//               className="w-full px-4 py-4 bg-[var(--auth-input-bg)] border border-[var(--auth-input-border)] rounded-xl focus:ring-2 focus:ring-[var(--auth-input-focus)] focus:border-transparent outline-none transition-all duration-300 hover:bg-[var(--auth-social-hover)]"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full px-4 py-4 pr-12 bg-[var(--auth-input-bg)] border border-[var(--auth-input-border)] rounded-xl focus:ring-2 focus:ring-[var(--auth-input-focus)] focus:border-transparent outline-none transition-all duration-300 hover:bg-[var(--auth-social-hover)]"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--auth-text-secondary)] hover:text-[var(--auth-text-primary)] transition-colors duration-200"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="w-4 h-4 text-[var(--auth-accent)] bg-[var(--auth-input-bg)] border-[var(--auth-input-border)] rounded focus:ring-[var(--auth-input-focus)] focus:ring-2"
//                 />
//                 <label
//                   htmlFor="remember"
//                   className="text-sm text-[var(--auth-text-secondary)]"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <a
//                 href="#"
//                 className="text-sm text-[var(--auth-accent)] hover:text-[var(--auth-accent-hover)] underline transition-colors duration-300"
//               >
//                 Forgot Password?
//               </a>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[var(--auth-accent)] text-[var(--color-edgenius-button-text)] hover:bg-[var(--auth-accent-hover)] shadow-lg ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                   SIGNING IN...
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </div>

//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-[var(--auth-divider)]"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-[var(--auth-container-bg)] text-[var(--auth-text-secondary)]">
//                 Or Sign In With
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-center space-x-4 mb-8">
//             <button className="w-12 h-12 bg-[var(--auth-social-bg)] border border-[var(--auth-social-border)] rounded-lg hover:bg-[var(--auth-social-hover)] transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
//               {/* Google icon */}
//             </button>
//             <button className="w-12 h-12 bg-[var(--auth-social-bg)] border border-[var(--auth-social-border)] rounded-lg hover:bg-[var(--auth-social-hover)] transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
//               {/* Facebook icon */}
//             </button>
//             <button className="w-12 h-12 bg-[var(--auth-social-bg)] border border-[var(--auth-social-border)] rounded-lg hover:bg-[var(--auth-social-hover)] transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
//               {/* LinkedIn icon */}
//             </button>
//             <button className="w-12 h-12 bg-[var(--auth-social-bg)] border border-[var(--auth-social-border)] rounded-lg hover:bg-[var(--auth-social-hover)] transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-sm hover:shadow-md">
//               {/* Twitter icon */}
//             </button>
//           </div>

//           <div className="text-center">
//             <span className="text-[var(--auth-text-secondary)]">
//               Don't have an account?{" "}
//             </span>
//             <a
//               href="/signup"
//               className="text-[var(--auth-accent)] hover:text-[var(--auth-accent-hover)] font-medium transition-colors duration-300 hover:underline"
//             >
//               Sign Up
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen ml-60 bg-[var(--auth-bg)] flex">
//       <div
//         className={`w-full max-w-7xl mx-auto bg-[var(--auth-container-bg)] rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
//           mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//         } lg:flex lg:m-8`}
//       >
//         <LeftPanel />
//         <RightPanel />
//       </div>
//     </div>
//   );
// }
