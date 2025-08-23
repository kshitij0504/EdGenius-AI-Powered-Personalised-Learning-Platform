// NotAuthorized.js
import React from "react";
import { Link } from "react-router-dom";
export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-600 mb-2">Not Authorized</h2>
      <p className="mb-4 text-gray-600">You do not have access to this page.</p>
      <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
    </div>
  );
}
