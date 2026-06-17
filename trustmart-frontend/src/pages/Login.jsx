import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
        </form>

      </div>
    </div>
  );
}