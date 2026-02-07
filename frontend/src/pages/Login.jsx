

function Login() {
    return (
        <div className="bg-[#E8E2D8] min-h-screen flex items-center justify-center p-4">
            <div className="w-full md:max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: '#6F8F72' }}>
                    Welcome Back
                </h1>
                <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
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
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
                            style={{ borderColor: '#E8E2D8' }}
                        />
                        <div className="text-right mt-2">
                            <a href="#" style={{ color: '#6F8F72' }} className="text-sm font-semibold hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg font-semibold text-white transition"
                        style={{ backgroundColor: '#6F8F72' }}
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account?{' '}
                    <a href="#" style={{ color: '#6F8F72' }} className="font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login