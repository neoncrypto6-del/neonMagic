import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';
export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
    // Pre-fill from bonus claim if available
    const tempName = localStorage.getItem('neoncrypto_temp_name');
    const tempEmail = localStorage.getItem('neoncrypto_temp_email');
    if (tempName) setName(tempName);
    if (tempEmail) setEmail(tempEmail);
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const { error } = await signup(name, email, password);
    if (error) {
      setError(error);
    } else {
      // Clear temp data
      localStorage.removeItem('neoncrypto_temp_name');
      localStorage.removeItem('neoncrypto_temp_email');
      navigate('/dashboard');
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">
            Create Account
          </h1>
          <p className="text-gray-400">Join NeonCrypto to manage your assets</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-t border-neon-cyan/30">
          {error &&
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                placeholder="John Doe" />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
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
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                placeholder="••••••••" />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                placeholder="••••••••" />

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 mt-2">

              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-neon-cyan hover:text-white font-medium">

              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>);

}