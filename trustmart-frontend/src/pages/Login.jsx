import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // ADD THIS

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setError(""); // ADD THIS
    
    // ADD VALIDATION
    if (state === "Sign Up" && !fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    console.log({ action: state, fullName, email, password, rememberMe });
    alert(state === "Sign Up" ? "Account created!" : "Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.5L12 3l9 6.5M21 9.5V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
            </svg>
          </div>
          <h2 className="font-bold text-3xl text-gray-800">
            <span className="font-light">Trust</span>
            <span className="text-blue-600 font-bold">Mart</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {state === "Sign Up" ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Error Message - ADD THIS */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2.5 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Full Name - Only for Sign Up */}
          {state === "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError("");
                }}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Remember Me & Forgot Password - Only for Login */}
          {state !== "Sign Up" && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Remember me
              </label>
              <label
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => alert("Password reset link sent to your email!")}
              >
                Forgot password?
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            {state}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <p className="text-sm text-center mt-6 text-gray-600">
          {state === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            onClick={() => {
              setState(state === "Sign Up" ? "Log In" : "Sign Up");
              setError("");
            }}
            className="text-blue-600 font-semibold hover:underline"
          >
            {state === "Sign Up" ? "Login" : "Signup"}
          </button>
        </p>

      </div>
    </div>
  );
}