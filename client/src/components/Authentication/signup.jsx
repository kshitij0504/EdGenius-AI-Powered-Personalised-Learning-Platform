import React, { useContext, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Chrome,
  Apple,
  Github,
  Zap,
  CheckCircle,
  X,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";

// Data
const interestsData = {
  "Technology & Innovation": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "IoT",
    "DevOps",
    "Mobile Development",
    "Web Development",
    "UI/UX Design",
    "Software Engineering",
  ],
  "Business & Entrepreneurship": [
    "Startups",
    "Digital Marketing",
    "E-commerce",
    "Leadership",
    "Project Management",
    "Sales",
    "Finance",
    "Consulting",
    "Business Strategy",
    "Venture Capital",
    "Product Management",
    "Operations",
  ],
  "Creative & Design": [
    "Graphic Design",
    "Photography",
    "Video Production",
    "Animation",
    "Writing",
    "Content Creation",
    "Brand Design",
    "Interior Design",
    "Fashion",
    "Music Production",
    "Digital Art",
    "Architecture",
  ],
  "Health & Wellness": [
    "Fitness",
    "Nutrition",
    "Mental Health",
    "Yoga",
    "Meditation",
    "Sports",
    "Healthcare",
    "Wellness Coaching",
    "Personal Training",
    "Therapy",
    "Alternative Medicine",
    "Public Health",
  ],
  "Education & Learning": [
    "Online Education",
    "Teaching",
    "Research",
    "Language Learning",
    "Academic Writing",
    "Curriculum Development",
    "Educational Technology",
    "Tutoring",
    "Professional Development",
    "Skill Building",
    "Certification Programs",
    "Knowledge Sharing",
  ],
  "Lifestyle & Personal": [
    "Travel",
    "Cooking",
    "Reading",
    "Gaming",
    "Movies & TV",
    "Podcasts",
    "Social Media",
    "Networking",
    "Personal Finance",
    "Real Estate",
    "Parenting",
    "Relationships",
  ],
};

const passwordRequirements = [
  { text: "At least 8 characters", regex: /.{8,}/ },
  { text: "One uppercase letter", regex: /[A-Z]/ },
  { text: "One lowercase letter", regex: /[a-z]/ },
  { text: "One number", regex: /\d/ },
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const {signUpUser, isLoading} = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const getPasswordStrength = () => {
    const met = passwordRequirements.filter((req) =>
      req.regex.test(formData.password)
    ).length;
    if (met === 0) return { strength: 0, label: "", color: "" };
    if (met <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (met === 3)
      return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };
  const passwordStrength = getPasswordStrength();

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (
      !passwordRequirements.every((req) => req.regex.test(formData.password))
    )
      newErrors.password = "Password doesn't meet requirements";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (!acceptTerms)
      newErrors.terms = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep(2);
    window.scrollTo(0, 0); // Ensures top
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFinalSubmit = async () => {
  const userData = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email,
    password: formData.password,
    interests: selectedInterests,
  };

  const result = await signUpUser(userData);
  if (result.success) {
    navigate("/studentdash");
  }
};


  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#1a73e8]/20 to-[#4285f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="relative z-10 w-full max-w-2xl xl:max-w-3xl">
        {/* Glassy Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 px-8 py-10 md:py-12 mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#4285f4]">
                Edgenius
              </span>
            </h1>
            <p className="text-gray-600">
              Start your AI-powered learning journey today
            </p>
          </div>

          {/* STEP 1: SIGNUP FORM */}
          {step === 1 && (
            <form onSubmit={handleSubmitStep1} className="space-y-5">
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                        errors.firstName ? "border-red-500" : "border-gray-200"
                      } transition-all`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                      errors.lastName ? "border-red-500" : "border-gray-200"
                    } transition-all`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } transition-all`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              {/* Row: Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                        errors.password ? "border-red-500" : "border-gray-200"
                      } transition-all`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {/* Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Strength:</span>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength.strength === 100
                              ? "text-green-600"
                              : passwordStrength.strength >= 66
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {/* Requirements */}
                  {formData.password && (
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {passwordRequirements.map((req, index) => {
                        const isMet = req.regex.test(formData.password);
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-1 text-xs"
                          >
                            {isMet ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <X className="w-3 h-3 text-gray-400" />
                            )}
                            <span
                              className={
                                isMet ? "text-green-700" : "text-gray-500"
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      } transition-all`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-[#1a73e8] bg-gray-100 border-gray-300 rounded focus:ring-[#1a73e8] focus:ring-2 mt-1"
                  />
                  <span className="text-xs md:text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#1a73e8] hover:text-[#1557b7] font-semibold"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-[#1a73e8] hover:text-[#1557b7] font-semibold"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
                )}
              </div>
              {/* Next */}
              <div className="sticky bottom-0 left-0 z-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white py-3 rounded-xl font-semibold hover:from-[#1557b7] hover:to-[#3367d6] transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <div className="text-center mt-7">
                  <Link
                    to="/signin"
                    className="text-[#1a73e8] hover:text-[#1557b7] font-semibold"
                  >
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: INTERESTS SELECTOR */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Your Interests
              </h2>
              <p className="text-gray-500 mb-6 text-center text-sm">
                Choose topics that excite you to personalize your experience
              </p>
              <div className="bg-white border border-gray-100 rounded-2xl p-3 md:p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                  {Object.entries(interestsData).map(
                    ([category, interests]) => (
                      <div key={category}>
                        <h3 className="font-semibold text-[#1a73e8] mb-1 text-sm">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`px-3 py-1 rounded-full border text-xs font-medium ${
                                selectedInterests.includes(interest)
                                  ? "bg-[#1a73e8] text-white border-[#1a73e8]"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                              } transition-all hover:bg-[#e3f2fd]`}
                            >
                              {interest}
                              {selectedInterests.includes(interest) && (
                                <Check className="inline-block ml-2 w-3 h-3 text-white" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="sticky bottom-0 left-0 z-10">
                <button
                  className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white py-3 rounded-xl font-semibold hover:from-[#1557b7] hover:to-[#3367d6] transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 flex items-center justify-center space-x-2"
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Finishing Up...</span>
                    </>
                  ) : (
                    <>
                      <span>Finish Signup</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <div className="text-center mt-7">
                <Link
                  to="/login"
                  className="text-[#1a73e8] hover:text-[#1557b7] font-semibold"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          )}

          {/* Features Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center space-x-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#1a73e8]" />
                <span className="text-gray-700 text-sm font-medium">
                  Free Forever
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#1a73e8]" />
                <span className="text-gray-700 text-sm font-medium">
                  AI-Powered
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#1a73e8]" />
                <span className="text-gray-700 text-sm font-medium">
                  No Setup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
