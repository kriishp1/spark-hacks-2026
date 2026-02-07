import { useState } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/login"
        }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for confirmation link!");
      }

    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again.");
    }
  }

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    })

    if (error) {
      setMessage(error.message);
    }
  }
  
  return (
    <div className="bg-[#E8E2D8] min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1
          className="text-2xl md:text-3xl font-bold text-center mb-2"
          style={{ color: "#6F8F72" }}
        >
          Sign Up
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create to your account
        </p>

        <form className="space-y-6" onSubmit={handleSignUp}>
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

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
              required
            />

          </div>

          <button
            type="submit"
            onSubmit={handleSignUp}
            className="w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#6F8F72" }}
          >
            Sign Up
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2 rounded-lg font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            Sign up with Google
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${message.includes('Error') || message.includes('Network')
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
            }`}>
            {message}
          </div>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Have an account?{" "}
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
