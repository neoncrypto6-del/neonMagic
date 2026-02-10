import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import {
  DollarSign,
  Gift,
  Wallet,
  Clock,
  Bell,
  Settings,
  ArrowUpRight } from
'lucide-react';
export function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
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
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white">
              Welcome, <span className="text-neon-cyan">{user.name}</span>!
            </h1>
            <p className="text-gray-400 mt-1">
              Here's an overview of your assets and rewards.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-neon-pink rounded-full"></span>
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <Link
              to="/withdraw"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-emerald-500 text-black font-bold flex items-center hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all duration-300">

              Withdraw <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Assets */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-neon-cyan">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-cyan/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-neon-cyan" />
              </div>
              <span className="text-xs font-medium text-neon-green bg-neon-green/10 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Assets</p>
            <h3 className="text-3xl font-bold text-white">
              ${user.total_assets?.toLocaleString() || '0'}
            </h3>
          </div>

          {/* Bonus Earned */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-neon-purple">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-purple/20 rounded-xl">
                <Gift className="w-6 h-6 text-neon-purple" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Bonus Earned</p>
            <h3 className="text-3xl font-bold text-white">
              ${user.bonus_earned?.toLocaleString() || '0'}
            </h3>
          </div>

          {/* Active Wallets */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-neon-blue">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-blue/20 rounded-xl">
                <Wallet className="w-6 h-6 text-neon-blue" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Active Wallets</p>
            <h3 className="text-3xl font-bold text-white">
              {user.active_wallets || 0}
            </h3>
          </div>

          {/* Pending Claims */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-neon-pink">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-pink/20 rounded-xl">
                <Clock className="w-6 h-6 text-neon-pink" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Pending Claims</p>
            <h3 className="text-3xl font-bold text-white">
              {user.pending_claims || 0}
            </h3>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="glass-panel p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {user.pending_claims > 0 ?
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-neon-pink/20 rounded-lg">
                    <Clock className="w-5 h-5 text-neon-pink" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Bonus Claim Pending
                    </h4>
                    <p className="text-sm text-gray-400">
                      Verification in progress
                    </p>
                  </div>
                </div>
                <span className="text-sm text-neon-pink font-medium">
                  Pending
                </span>
              </div> :

            <p className="text-gray-400 text-center py-8">
                No recent activity to show.
              </p>
            }

            {user.bonus_earned > 0 &&
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-neon-green/20 rounded-lg">
                    <Gift className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Bonus Credited</h4>
                    <p className="text-sm text-gray-400">
                      30% bonus applied to account
                    </p>
                  </div>
                </div>
                <span className="text-sm text-neon-green font-medium">
                  +${user.bonus_earned.toLocaleString()}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}