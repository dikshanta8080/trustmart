import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail, Phone } from "lucide-react";

export default function ForgetPasswordPage() {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSendOTP = () => {
  if (method === "email" && !email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (method === "phone" && !phone.trim()) {
    alert("Please enter your phone number");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    alert("OTP sent successfully!");
  }, 1500);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-gray-500 text-sm mt-1 text-center">
            Choose how you want to recover your account
          </p>
        </div>

        {/* Recovery Method */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
              method === "email"
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>

          <button
            type="button"
            onClick={() => setMethod("phone")}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
              method === "phone"
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone
          </button>
        </div>

        {/* Dynamic Form */}
        {method === "email" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98XXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </p>

      </div>
    </div>
  );
} 