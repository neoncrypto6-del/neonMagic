import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, UserPlus, LogIn } from 'lucide-react';
export function CongratulationsPage() {
  const [name, setName] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const storedName = localStorage.getItem('neoncrypto_temp_name');
    if (storedName) setName(storedName);
    // Hide confetti after 4 seconds
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* CSS Confetti */}
      {showConfetti &&
      <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({
          length: 50
        }).map((_, i) =>
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: [
            '#00f0ff',
            '#b000ff',
            '#00ff88',
            '#ff00aa',
            '#0066ff'][
            i % 5],
            animation: `confettiFall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s forwards`,
            opacity: 0.8
          }} />

        )}
          <style>{`
            @keyframes confettiFall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
        </div>
      }

      <div className="max-w-xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-12 h-12 text-neon-green" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
          Congratulations {name}! 🎉
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your 30% bonus claim has been verified and is ready for withdrawal.
        </p>

        <div className="glass-panel p-8 rounded-3xl border border-neon-green/30 mb-8">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
            Confirmation Code
          </p>
          <div className="bg-white p-4 rounded-xl inline-block mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NeonCrypto-Bonus-Verified"
              alt="Confirmation QR"
              className="w-32 h-32" />

          </div>
          <p className="text-neon-green font-bold text-lg">CLAIM VERIFIED</p>
          <p className="text-xs text-gray-500 mt-2">
            Scan to save confirmation
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400 mb-4">
            Please create an account or login to access your dashboard and
            withdraw your funds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/signup"
              className="flex items-center justify-center px-6 py-4 rounded-xl bg-neon-cyan text-black font-bold hover:bg-white transition-colors">

              <UserPlus className="w-5 h-5 mr-2" /> Create Account
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-colors">

              <LogIn className="w-5 h-5 mr-2" /> Login
            </Link>
          </div>
        </div>
      </div>
    </div>);

}