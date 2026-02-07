import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supaBaseClient"
import { useState } from "react"


export default function Login() {

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage("You can Sign In");
                navigate("/dashboard");
            }


        } catch (error) {
            console.error("Network error:", error);
            setMessage("Network error. Please try again.");
        }
    }
    return (
        <div className="bg-[#E8E2D8] min-h-screen flex items-center justify-center p-4">
            <div className="w-full md:max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: '#6F8F72' }}>
                    Welcome Back
                </h1>
                <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
                            style={{ borderColor: '#E8E2D8' }}
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
                            style={{ borderColor: '#E8E2D8' }}
                        />
                        <div className="text-right mt-2">
                            <Link to="/forgot-password" style={{ color: '#6F8F72' }} className="text-sm font-semibold hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-center text-sm ${message.includes('Error') || message.includes('Network')
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-green-100 text-green-700 border border-green-300'
                            }`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: '#6F8F72' }}
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#6F8F72' }} className="font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
