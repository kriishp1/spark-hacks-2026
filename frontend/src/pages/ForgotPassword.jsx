import { useState } from 'react';
import { supabase } from '../supaBaseClient';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    console.log('Reset password attempt for:', email);

    if (!email) {
      setMessage('Please enter your email address');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Make sure the redirect URL matches your Supabase site URL
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/new-password`,
      });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        
        // More specific error messages
        if (error.message.includes('rate limit')) {
          setMessage('Too many requests. Please try again in a few minutes.');
        } else if (error.message.includes('User not found')) {
          // For security, don't reveal if email exists or not
          setMessage('If this email is registered, you will receive a password reset link.');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else {
        console.log('Password reset email sent successfully');
        // Always show success even if email doesn't exist (security best practice)
        setMessage('If this email is registered, you will receive a password reset link. Please check your inbox and spam folder.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#E8E2D8] min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1
          className="text-2xl md:text-3xl font-bold text-center mb-2"
          style={{ color: "#6F8F72" }}
        >
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address and we'll send you a link to reset your password.
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
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition cursor-pointer ${
              loading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-90'
            }`}
            style={{ backgroundColor: "#6F8F72" }}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes('receive') || message.includes('Check')
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <button
              onClick={() => navigate('/login')}
              style={{ color: "#6F8F72" }}
              className="font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate('/signup')}
              style={{ color: "#6F8F72" }}
              className="font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
