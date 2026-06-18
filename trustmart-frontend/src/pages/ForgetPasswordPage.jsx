import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-gray-500 text-sm mt-1 text-center">
            Reset your account password
          </p>
        </div>

      </div>
    </div>
  );
}