'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await signIn('credentials', {
        username: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage('Welcome to the shadows...');
      }
    } catch (error) {
      setMessage('Something lurks in the darkness...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Dark background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      {/* Subtle red glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo/Branding Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            {/* Wolf-like icon placeholder */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full flex items-center justify-center mb-4">
              <div className="text-2xl">🐺</div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
              <span className="text-red-500">EVIL</span>STASH
            </h1>
            <p className="text-gray-400 text-sm tracking-widest font-light">
              UNDER A CLOAK OF SECRECY
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Enter the <span className="text-red-500">Shadows</span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your credentials..."
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Your secret key..."
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm border ${
                message.includes('Error') || message.includes('lurks')
                  ? 'bg-red-900 bg-opacity-50 text-red-300 border-red-700' 
                  : 'bg-green-900 bg-opacity-50 text-green-300 border-green-700'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Accessing the vault...
                </div>
              ) : (
                'Enter the Stash'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              New to the shadows?{' '}
              <a 
                href="/sign-up" 
                className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
              >
                Join the conspiracy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}