import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

// Main LoginPage component - this function renders the login/signup page
export default function LoginPage() {
  // State to switch between Login and Register form
  const [isRegister, setIsRegister] = useState(false);
  
  // State to show/hide password
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Form input fields - user typed data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading state - show spinner on button
  const [loading, setLoading] = useState(false);
  
  // Remember me checkbox - save email or not
  const [rememberMe, setRememberMe] = useState(false);
  
  // Error message display
  const [error, setError] = useState("");

  // Navigate function - redirect to different pages
  const navigate = useNavigate();

  // useEffect - read email from localStorage when page loads
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    // If email exists, auto fill it
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []); // Empty array - only run once when page loads

  // Form submit handler function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    setError(""); // Clear old error

    // Validation - Full name check (only for register)
    if (isRegister && !fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    // Validation - Email empty check
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // Validation - Email format check (must have @ and .)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validation - Password empty check
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    // Validation - Password length check (minimum 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Validation - Confirm password match (only for register)
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Start loading - show spinner on button
    setLoading(true);

    // For login case - remember me check
    if (!isRegister) {
      if (rememberMe) {
        // If remember me is checked, save email to localStorage
        localStorage.setItem("rememberedEmail", email);
      } else {
        // If unchecked, remove email from localStorage
        localStorage.removeItem("rememberedEmail");
      }
    }

    // Simulate API call - response comes after 1.2 seconds
    setTimeout(() => {
      setLoading(false); // Stop loading

      if (isRegister) {
        // Register success - show alert
        alert("Account created successfully!");
        // Reset form and switch to login mode
        setIsRegister(false);
        setFullName("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Login success - navigate to dashboard
        navigate("/dashboard");
      }
    }, 1200);
  };

  // Return UI - this defines the page structure
  return (
    // Main container - full screen with gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      
      {/* Wrapper div - holds both login box and footer */}
      <div className="w-full max-w-md">
        
        {/* Login Box - white card with shadow */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">

          {/* Logo Section - top of the box */}
          <div className="flex flex-col items-center mb-8">
            {/* Shield icon with blue background */}
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>

            {/* App name */}
            <h1 className="text-2xl font-bold text-gray-900">
              Trustmart
            </h1>

            {/* Subtitle - changes based on login/register mode */}
            <p className="text-gray-500 text-sm mt-1">
              {isRegister
                ? "Create your account"
                : "Sign in to continue buying and selling"}
            </p>
          </div>

          {/* Error Message - shows if any validation fails */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Form - main form for login/register */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name Input - only shown in register mode */}
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>

                <div className="relative">
                  {/* User icon inside input */}
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setError(""); // Clear error when typing
                    }}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                {/* Mail icon inside input */}
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error when typing
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                {/* Lock icon inside input */}
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type={showPass ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); // Clear error when typing
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                />

                {/* Eye button to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" /> // Hide icon
                  ) : (
                    <Eye className="w-4 h-4" /> // Show icon
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input - only shown in register mode */}
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError(""); // Clear error when typing
                    }}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                  />

                  {/* Eye button for confirm password */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me - only shown in login mode */}
            {!isRegister && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                {/* Forgot Password link */}
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit Button - changes text based on mode */}
            <button
              type="submit"
              disabled={loading} // Disable while loading
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? (
                // Show spinner while loading
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {isRegister
                    ? "Creating Account..."
                    : "Signing In..."}
                </div>
              ) : (
                // Normal button text
                isRegister
                  ? "Create Account"
                  : "Sign In"
              )}
            </button>
          </form>

          {/* Divider with "or continue with" text */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons - Google and Facebook */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition">
              <span className="text-red-500 font-bold text-lg">G</span>
              Google
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition">
              <span className="text-blue-600 font-bold text-lg">f</span>
              Facebook
            </button>
          </div>

          {/* Toggle between Login and Register */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister); // Switch mode
                setError(""); // Clear errors
              }}
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              {isRegister ? "Sign In" : "Create One"}
            </button>
          </p>
        </div>
        {/* End of Login Box */}

        {/* THIS IS THE FOOTER - Copyright text outside the box */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            © 2026 Trustmart. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}