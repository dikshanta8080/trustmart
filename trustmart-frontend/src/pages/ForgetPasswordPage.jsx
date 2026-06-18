import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowLeft, Phone, Check, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(false);
  
  // New Password States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
    setOtpSent(false);
    setStep(1);
  };

  // Step 1: Send OTP
  const handleSendOTP = (e) => {
    e.preventDefault();
    if (method === "email" && !email) return;
    if (method === "phone" && !phone) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setStep(2);
      setResendDisabled(true);
      let countdown = 60;
      const interval = setInterval(() => {
        countdown--;
        setTimer(countdown);
        if (countdown === 0) {
          clearInterval(interval);
          setResendDisabled(false);
        }
      }, 1000);
    }, 1200);
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otpValue === "123456") {
        setStep(3); // Go to reset password step
        setOtpError("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    }, 1200);
  };

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSuccess(true);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleResendOTP = () => {
    setResendDisabled(true);
    setTimer(60);
    let countdown = 60;
    const interval = setInterval(() => {
      countdown--;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  // Success Page
  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful! 🔒</h2>
          <p className="text-gray-500 text-sm mb-6">Your password has been reset successfully. You can now login with your new password.</p>
          <Link to="/login" className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Create New Password"}
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            {step === 1 && "Choose how you want to receive the verification code"}
            {step === 2 && `Enter the 6-digit code sent to ${method === "email" ? email : phone}`}
            {step === 3 && "Enter your new password"}
          </p>
        </div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => { setMethod("email"); setOtpSent(false); }}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
                  method === "email"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </button>

              <button
                type="button"
                onClick={() => { setMethod("phone"); setOtpSent(false); }}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
                  method === "phone"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Phone</span>
              </button>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              {method === "email" ? (
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
                      placeholder="Enter your email...."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    We'll send a 6-digit OTP to your email
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="977 98........"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    We'll send a 6-digit OTP via SMS
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-digit OTP
              </label>

              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                    required
                  />
                ))}
              </div>

              {otpError && (
                <div className="flex items-center justify-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{otpError}</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Didn't receive the OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendDisabled}
                  className={`text-blue-600 hover:underline font-medium ${
                    resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Resend OTP {resendDisabled && `(${timer}s)`}
                </button>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying OTP...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Resetting Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        {/* Back to Login */}
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