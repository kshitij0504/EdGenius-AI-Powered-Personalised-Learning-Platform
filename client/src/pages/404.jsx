// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-2xl mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="mb-4 text-gray-600 text-lg">Page Not Found</p>
        <Link to="/" className="text-[#1a73e8] font-semibold hover:underline">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
