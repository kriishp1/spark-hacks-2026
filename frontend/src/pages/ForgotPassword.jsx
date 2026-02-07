import { useState } from "react";
import { supabase } from "../supaBaseClient";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/new-password`,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Password reset link sent! Check your email.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E8E2D8] min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1
          className="text-2xl md:text-3xl font-bold text-center mb-2"
          style={{ color: "#6F8F72" }}
        >
          Reset Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email to receive a password reset link
        </p>

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#6F8F72" }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.includes("Error") || message.includes("Network")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
              style={{ color: "#6F8F72" }}
              className="font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#6F8F72" }}
              className="font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
