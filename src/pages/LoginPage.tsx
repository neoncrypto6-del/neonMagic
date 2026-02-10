import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await login(email, password);
    if (error) {
      setError(error);
    } else {
      navigate('/dashboard');
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to access your dashboard</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-t border-neon-purple/30">
          {error &&
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                placeholder="john@example.com" />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                placeholder="••••••••" />

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(176,0,255,0.4)] transition-all duration-300 mt-2">

              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-neon-purple hover:text-white font-medium">

              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>);

}