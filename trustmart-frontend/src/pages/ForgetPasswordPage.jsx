import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowLeft } from "lucide-react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forget Password</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Enter your email to receive a verification code
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Send Verification Code
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}