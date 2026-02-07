import { useState, useEffect } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        setMessage("Invalid or expired reset link. Please request a new one.");
      }
    };
    
    checkSession();
  }, []);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setMessage("Error: Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Password updated successfully! Signing out and redirecting to login...");

        // Sign out the user to force them to login with new password
        await supabase.auth.signOut();

        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
          Set New Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your new password below
        </p>

        {isValidSession ? (
          <form className="space-y-6" onSubmit={handleUpdatePassword}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
                style={{ borderColor: "#E8E2D8" }}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
                style={{ borderColor: "#E8E2D8" }}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#6F8F72" }}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="inline-block px-6 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#6F8F72" }}
            >
              Request New Reset Link
            </Link>
          </div>
        )}

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.includes("Error") || message.includes("Network") || message.includes("Invalid")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            style={{ color: "#6F8F72" }}
            className="font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
