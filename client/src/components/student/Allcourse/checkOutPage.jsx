// pages/CheckoutPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  IoArrowBack, 
  IoCheckmarkCircleOutline, 
  IoCardOutline,
  IoLockClosedOutline,
  IoTimeOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoCloseCircleOutline,
  IoRefreshOutline
} from 'react-icons/io5';
import { useCourses } from '../../../context/CourseContextProvider';
import { AuthContext } from '../../../context/AuthContext';
import StudentLayout from '../StudentLayout';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  return (
    <StudentLayout>
      <CheckoutContent />
    </StudentLayout>
  );
};

const CheckoutContent = ({ isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyPayment } = useCourses();
  const { user } = useContext(AuthContext);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed
  
  const courseData = location.state?.courseData;
  const enrollmentData = location.state?.enrollmentData;

  useEffect(() => {
    // Redirect if no course data
    if (!courseData || !enrollmentData) {
      navigate('/courses');
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [courseData, enrollmentData, navigate]);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded. Please refresh the page.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    const options = {
      key: "rzp_test_b3CgCwX0khGYKR",
      amount: enrollmentData.amount,
      currency: 'INR',
      name: 'Edgenius',
      description: `Enrollment for ${courseData.title}`,
      order_id: enrollmentData.razorpayOrderId,
      handler: async function (response) {
        try {
          const verificationData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };

          await verifyPayment(verificationData);
          
          setPaymentStatus('success');
          toast.success('Payment successful! You are now enrolled in the course.');
          
          setTimeout(() => {
            navigate(`/courses/${courseData.slug}/learn`);
          }, 2000);

        } catch (error) {
          setPaymentStatus('failed');
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
        contact: user?.phone || ''
      },
      theme: {
        color: isDarkMode ? '#3B82F6' : '#1D4ED8'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          setPaymentStatus('pending');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!courseData || !enrollmentData) {
    return null;
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
        <div className={`absolute bottom-40 left-20 w-48 h-48 rounded-full opacity-8 blur-2xl animate-pulse ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl ${isDarkMode ? "bg-indigo-500" : "bg-indigo-300"}`} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        {/* Enhanced Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 group hover:scale-105 ${
              isDarkMode 
                ? "bg-gray-800/50 backdrop-blur-xl text-blue-300 hover:bg-gray-700/60 border border-gray-700/50" 
                : "bg-white/70 backdrop-blur-xl text-blue-600 hover:bg-white shadow-lg border border-white/20"
            }`}
          >
            <IoArrowBack className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Course
          </button>
        </div>

        {/* Payment Status Display */}
        {paymentStatus === 'success' && (
          <div className={`rounded-3xl p-8 mb-8 text-center backdrop-blur-xl border transition-all duration-500 ${isDarkMode ? "bg-green-900/20 border-green-500/30 shadow-green-500/10 shadow-2xl" : "bg-green-50/80 border-green-200/50 shadow-green-200/20 shadow-2xl"}`}>
            <IoCheckmarkCircleOutline className="text-7xl text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              🎉 Payment Successful!
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Welcome to {courseData.title}! Redirecting you to start learning...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
              <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Redirecting...</span>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className={`rounded-3xl p-8 mb-8 text-center backdrop-blur-xl border transition-all duration-500 ${isDarkMode ? "bg-red-900/20 border-red-500/30 shadow-red-500/10 shadow-2xl" : "bg-red-50/80 border-red-200/50 shadow-red-200/20 shadow-2xl"}`}>
            <IoCloseCircleOutline className="text-7xl text-red-500 mx-auto mb-6" />
            <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Payment Failed
            </h2>
            <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Don't worry! Your payment was not processed. Please try again or contact our support team.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setPaymentStatus('pending')}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <IoRefreshOutline className="mr-2" />
                Try Again
              </button>
              <button
                onClick={() => navigate('/support')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
              >
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Main Checkout Form */}
        {paymentStatus === 'pending' && (
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-8">
            {/* Course Details Section */}
            <div className="xl:col-span-3 lg:col-span-2">
              <div className={`rounded-3xl shadow-2xl p-8 backdrop-blur-xl border transition-all duration-300 hover:shadow-3xl ${isDarkMode ? "bg-gray-900/60 border-gray-800/50" : "bg-white/70 border-white/20"}`}>
                {/* Header */}
                <div className="mb-8">
                  <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${isDarkMode ? "from-white to-gray-300" : "from-gray-900 to-gray-700"} bg-clip-text text-transparent`}>
                    Complete Your Enrollment
                  </h1>
                  <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    You're one step away from starting your learning journey
                  </p>
                </div>

                {/* Course Info Card */}
                <div className={`rounded-2xl p-6 mb-8 border transition-all duration-300 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-gray-50/70 border-gray-200/50"}`}>
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img
                        src={courseData.thumbnail}
                        alt={courseData.title}
                        className="w-28 h-28 rounded-2xl object-cover shadow-lg"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/112x112/91C8E4/4682A9?text=Course";
                        }}
                      />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${isDarkMode ? "bg-green-500 border-gray-900" : "bg-green-500 border-white"}`}>
                        <IoCheckmarkCircleOutline className="text-white text-sm" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {courseData.title}
                      </h2>
                      <p className={`mb-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {courseData.description}
                      </p>
                      
                      {/* Course Meta */}
                      <div className="flex flex-wrap items-center gap-4">
                        <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-blue-100 text-blue-600 border border-blue-200"}`}>
                          {courseData.category}
                        </span>
                        <span className={`flex items-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <IoTimeOutline className="mr-2" />
                          {courseData.duration || 'Self-paced'}
                        </span>
                        <span className={`flex items-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <IoStarOutline className="mr-1" />
                          4.8 (2.1k reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className={`rounded-2xl p-6 mb-8 border ${isDarkMode ? "bg-gray-800/30 border-gray-700/50" : "bg-blue-50/50 border-blue-200/50"}`}>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    What's included in this course
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Lifetime access to course content",
                      "Certificate of completion",
                      "24/7 community support",
                      "Mobile and desktop access",
                      "Downloadable resources",
                      "Regular content updates"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <IoCheckmarkCircleOutline className="text-green-500 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Trust Badges */}
                <div className={`rounded-2xl p-6 border ${isDarkMode ? "bg-gray-800/30 border-gray-700/50" : "bg-gray-50/50 border-gray-200/50"}`}>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <IoLockClosedOutline className="text-3xl text-green-500 mb-2" />
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        256-bit SSL Security
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Your data is protected
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <IoCardOutline className="text-3xl text-blue-500 mb-2" />
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        All Payment Methods
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Cards, UPI, Net Banking
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <IoShieldCheckmarkOutline className="text-3xl text-purple-500 mb-2" />
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        30-Day Money Back
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Risk-free guarantee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary Sidebar */}
            <div className="xl:col-span-2 lg:col-span-1">
              <div className={`rounded-3xl shadow-2xl p-8 sticky top-8 backdrop-blur-xl border transition-all duration-300 hover:shadow-3xl ${isDarkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/80 border-white/20"}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Order Summary
                </h3>

                {/* Price Breakdown */}
                <div className={`rounded-2xl p-6 mb-6 border ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-gray-50/70 border-gray-200/50"}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Course Price:
                      </span>
                      <span className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        ₹{(enrollmentData.amount / 100).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Platform Fee:
                      </span>
                      <span className="font-semibold text-green-500 flex items-center">
                        <span className="line-through text-gray-400 mr-2">₹99</span>
                        FREE
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Taxes & Fees:
                      </span>
                      <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Included
                      </span>
                    </div>

                    <div className={`border-t pt-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          Total Amount:
                        </span>
                        <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                          ₹{(enrollmentData.amount / 100).toLocaleString()}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        One-time payment • Lifetime access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 mb-6 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white shadow-xl hover:shadow-2xl"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <IoLockClosedOutline className="mr-2" />
                      Secure Checkout
                    </div>
                  )}
                </button>

                {/* Trust Indicators */}
                <div className="text-center space-y-3">
                  <div className="flex justify-center space-x-4">
                    <img src="https://via.placeholder.com/40x25/4F46E5/FFFFFF?text=VISA" alt="Visa" className="h-6 opacity-70" />
                    <img src="https://via.placeholder.com/40x25/EB001B/FFFFFF?text=MC" alt="Mastercard" className="h-6 opacity-70" />
                    <img src="https://via.placeholder.com/40x25/00BAF2/FFFFFF?text=UPI" alt="UPI" className="h-6 opacity-70" />
                  </div>
                  
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    By completing this purchase, you agree to our{' '}
                    <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                  </p>

                  <div className={`flex items-center justify-center space-x-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <IoShieldCheckmarkOutline className="text-green-500" />
                    <span>Protected by advanced encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Processing Overlay */}
        {paymentStatus === 'processing' && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300">
            <div className={`rounded-3xl p-10 text-center max-w-md mx-4 shadow-2xl border transition-all duration-500 ${isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-white/20"}`}>
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500/30 border-t-blue-500 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <IoLockClosedOutline className="text-blue-500 text-2xl" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Processing Your Payment
              </h3>
              <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Please wait while we securely process your payment...
              </p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Do not close this window or press the back button
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;