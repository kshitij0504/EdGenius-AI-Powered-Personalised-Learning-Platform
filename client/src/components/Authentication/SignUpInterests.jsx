// src/pages/auth/SignUpInterests.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignUpInterests() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [interests, setInterests] = useState("");
  const location = useLocation();
  const { name, email, password } = location.state || {};

  // If no state (user navigated directly), go back
  if (!state?.email || !state?.password) {
    navigate("/signup");
    return null;
  }

  const handleSubmit = async () => {
    const interestsArray = interests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    console.log("Sending:", email, password, interests);
    //   const res = await signup(email, password, interests);
    const res = await signup(name, email, password, interestsArray);

    if (res.success) {
      alert(res.message);
      navigate("/signin");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4] to-[#749BC2]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Interests</h1>
        <p className="text-sm text-gray-500 mb-4">
          Enter your interests separated by commas
        </p>
        <textarea
          rows={4}
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="AI, Web Development, Cloud..."
        ></textarea>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#4682A9] text-white font-semibold hover:bg-[#749BC2]"
        >
          {loading ? "Signing Up..." : "Complete Sign Up"}
        </button>
      </div>
    </div>
  );
}
