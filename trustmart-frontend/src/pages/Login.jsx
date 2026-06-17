import React, { useState } from "react";

export default function LoginPage() {
  const [state, setState] = useState("Sign Up");

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

      </div>
    </div>
  );
}