import { useState } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate } from "react-router-dom";

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

      if (data.user && data.user.confirmed_at) {
        setTimeout(() => {
          navigate("/Login");
        }, (2000));
      }

    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again.");
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

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
            />
            
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#6F8F72" }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="#"
            style={{ color: "#6F8F72" }}
            className="font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
