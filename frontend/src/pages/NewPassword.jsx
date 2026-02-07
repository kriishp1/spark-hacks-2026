import { useState } from 'react';
import { supabase } from '../supaBaseClient';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    // Validation
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }


    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setMessage('Please sign in to change your password');
        setLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setMessage(`Error: ${updateError.message}`);
      } else {
        setMessage('Password updated successfully! Signing you out...');
        // Clear form
        setNewPassword('');
        setConfirmPassword('');
        
        await supabase.auth.signOut();
        
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      console.error('Change password error:', error);
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
          Change Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Update your account password
        </p>

        <form className="space-y-6" onSubmit={handleChangePassword}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#6F8F72]"
              style={{ borderColor: "#E8E2D8" }}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes('successfully')
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}


        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{" "}
            <button
              onClick={() => navigate('/forgot-password')}
              style={{ color: "#6F8F72" }}
              className="font-semibold hover:underline"
            >
              Reset via email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
