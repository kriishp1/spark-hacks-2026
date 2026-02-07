import { useState } from 'react'
import { supabase } from "./supaBaseClient";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSignUp = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for confirmation link!");
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Enter your details to get started</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </button>
          </div>
        </form>

        {message && (
          <div className={`text-center text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">Already have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500">Sign in</a></p>
      </div>
    </div>
  )
}
