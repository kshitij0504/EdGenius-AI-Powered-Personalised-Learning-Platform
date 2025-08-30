import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Settings,
  Book,
  Trophy,
  Clock,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Plus,
  Trash2,
  Star,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';
import StudentLayout from './StudentLayout';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: user?.name || 'Kshitij Oza',
    email: user?.email || 'ozakshitij@gmail.com',
    bio: '',
    location: '',
    phone: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    interests: user?.interests || ['JavaScript', 'React', 'Node.js', 'Python'],
    profilePhoto: user?.profilePhoto || ''
  });

  // State for adding new interest
  const [newInterest, setNewInterest] = useState('');
  const fileInputRef = useRef(null);

  // Check for dark mode
  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving user data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'Kshitij Oza',
      email: user?.email || 'ozakshitij@gmail.com',
      bio: '',
      location: '',
      phone: '',
      website: '',
      github: '',
      linkedin: '',
      twitter: '',
      interests: user?.interests || ['JavaScript', 'React', 'Node.js', 'Python'],
      profilePhoto: user?.profilePhoto || ''
    });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate initials for avatar
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <StudentLayout>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className={`text-3xl sm:text-4xl font-bold text-gray-900`}>
                  Profile Settings
                </h1>
                <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your account information and preferences
                </p>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="group inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Edit3 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCancel}
                    className={`inline-flex items-center justify-center px-6 py-3 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Profile Card */}
            <div className="xl:col-span-4">
              <div className={`relative rounded-3xl border ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/80 border-gray-200/50'
              }`}>
                <div className="relative p-8">
                  {/* Profile Header */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                      <div className="relative">
                        {formData.profilePhoto ? (
                          <img
                            src={formData.profilePhoto}
                            alt="Profile"
                            className="w-32 h-32 rounded-3xl object-cover mx-auto"
                          />
                        ) : (
                          <div className={`w-32 h-32 rounded-3xl mx-auto flex items-center justify-center text-4xl font-bold ${
                            isDarkMode 
                              ? 'bg-gray-600 text-gray-200' 
                              : 'bg-gray-600 text-white'
                          }`}>
                            {getInitials(formData.name)}
                          </div>
                        )}
                        
                        {/* Online Status */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-500 rounded-full border-4 border-white flex items-center justify-center">
                          <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl p-3 transition-all duration-300 hover:scale-110"
                          >
                            <Camera className="w-5 h-5" />
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formData.name}
                      </h2>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Student
                      </p>
                      
                      {/* Level Badge */}
                      <div className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-2xl">
                        <Trophy className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Level 7</span>
                        <span className="ml-2 text-gray-200">• 1250 XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className={`flex items-center justify-center p-4 rounded-2xl mb-6 border-2 ${
                    user?.isVerified 
                      ? 'bg-gray-100 border-gray-200 text-gray-700' 
                      : 'bg-gray-100 border-gray-200 text-gray-700'
                  }`}>
                    {user?.isVerified ? (
                      <>
                        <CheckCircle className="w-6 h-6 mr-3 text-gray-600" />
                        <span className="font-semibold">Verified Account</span>
                        <div className="ml-2 w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 mr-3 text-gray-600" />
                        <span className="font-semibold">Unverified Account</span>
                      </>
                    )}
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-2xl text-center ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border border-gray-600/30' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <Calendar className={`w-6 h-6 mx-auto mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <p className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Member Since
                      </p>
                      <p className={`text-sm font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Aug 19, 2025
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl text-center ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border border-gray-600/30' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <Clock className={`w-6 h-6 mx-auto mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <p className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Last Active
                      </p>
                      <p className={`text-sm font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  {/* Achievement Showcase */}
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border border-gray-600/30' 
                      : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <h4 className={`font-semibold mb-3 flex items-center ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Award className="w-5 h-5 mr-2 text-gray-600" />
                      Recent Achievements
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Course Completion
                        </span>
                        <span className="text-2xl">🎓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          7-Day Streak
                        </span>
                        <span className="text-2xl">🔥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* Basic Information Card */}
              <div className={`rounded-3xl border ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/80 border-gray-200/50'
              }`}>
                <div className="relative p-8">
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className={`p-3 rounded-2xl mr-4 ${
                        isDarkMode 
                          ? 'bg-gray-700/50 text-gray-400' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <User className="w-6 h-6" />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Basic Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-white bg-gray-700/30' 
                              : 'text-gray-900 bg-gray-50'
                          }`}>
                            {formData.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Email Address
                        </label>
                        <div className={`flex items-center py-3 px-4 rounded-2xl ${
                          isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                        }`}>
                          <Mail className={`w-5 h-5 mr-3 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <p className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formData.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Enter phone number"
                          />
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.phone || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Enter your location"
                          />
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.location || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 space-y-2">
                      <label className={`block text-sm font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-300 resize-none ${
                            isDarkMode 
                              ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className={`py-4 px-4 rounded-2xl font-medium min-h-[100px] ${
                          isDarkMode 
                            ? 'text-gray-300 bg-gray-700/30' 
                            : 'text-gray-600 bg-gray-50'
                        }`}>
                          {formData.bio || 'No bio provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div className={`rounded-3xl border ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/80 border-gray-200/50'
              }`}>
                <div className="relative p-8">
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className={`p-3 rounded-2xl mr-4 ${
                        isDarkMode 
                          ? 'bg-gray-700/50 text-gray-400' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Social Links
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Website
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="https://yourwebsite.com"
                          />
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.website || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          GitHub
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <Github className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                              type="text"
                              name="github"
                              value={formData.github}
                              onChange={handleInputChange}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                                isDarkMode 
                                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                              }`}
                              placeholder="github.com/username"
                            />
                          </div>
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.github || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          LinkedIn
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <Linkedin className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                              type="text"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                                isDarkMode 
                                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                              }`}
                              placeholder="linkedin.com/in/username"
                            />
                          </div>
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.linkedin || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Twitter
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <Twitter className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                              type="text"
                              name="twitter"
                              value={formData.twitter}
                              onChange={handleInputChange}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                                isDarkMode 
                                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                              }`}
                              placeholder="twitter.com/username"
                            />
                          </div>
                        ) : (
                          <p className={`py-3 px-4 rounded-2xl font-medium ${
                            isDarkMode 
                              ? 'text-gray-300 bg-gray-700/30' 
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {formData.twitter || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests Card */}
              <div className={`rounded-3xl border ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/80 border-gray-200/50'
              }`}>
                <div className="relative p-8">
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className={`p-3 rounded-2xl mr-4 ${
                        isDarkMode 
                          ? 'bg-gray-700/50 text-gray-400' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Star className="w-6 h-6" />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Interests & Skills
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-3">
                        {formData.interests.map((interest, index) => (
                          <div 
                            key={index} 
                            className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {interest}
                            {isEditing && (
                              <button 
                                onClick={() => removeInterest(interest)}
                                className={`ml-2 text-red-500 hover:text-red-600 transition-colors duration-300`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {isEditing && (
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            className={`flex-1 px-4 py-3 border-2 rounded-2xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Add new interest..."
                          />
                          <button
                            onClick={addInterest}
                            className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default UserProfile;