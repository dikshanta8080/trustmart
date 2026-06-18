import React, { useState, useEffect } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (state === "Sign Up" && !fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log({ 
        action: state, 
        fullName: state === "Sign Up" ? fullName : undefined, 
        email, 
        password,
        rememberMe 
      });
      
      // Store remember me in localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      alert(state === "Sign Up" ? "Account created successfully!" : "Login successful!");
      
      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setRememberMe(false);
      
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3">
  <span className="text-xl text-white font-bold">TM</span>
</div>
          </div>
          <h2 className="font-bold text-3xl text-gray-800">
            <span className="font-light">Trust</span>
            <span className="text-blue-600 font-bold">Mart</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {state === "Sign Up" ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {error && (
  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2.5 rounded-lg mb-4 text-sm">
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
              Email Address
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </button>
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
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => alert("Password reset link sent to your email!")}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
         <button
  type="submit"
  disabled={loading}
  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      {state === "Sign Up" ? "Signing Up..." : "Logging In..."}
    </div>
  ) : (
    state
  )}
</button>
        </form>

        {/* Toggle Login / Signup */}
        <p className="text-sm text-center mt-6 text-gray-600">
          {state === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setState(state === "Sign Up" ? "Log In" : "Sign Up");
              setError("");
              setRememberMe(false);
            }}
            className="text-blue-600 font-semibold hover:underline"
          >
            {state === "Sign Up" ? "Login" : "Signup"}
          </button>
        </p>

   <p className="text-center text-gray-400 text-xs mt-4">
    © 2026 TrustMart. All rights reserved.
  </p>
      </div>
    </div>
  );
}