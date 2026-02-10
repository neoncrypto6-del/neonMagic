import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Gift,
  TrendingUp,
  Users,
  DollarSign } from
'lucide-react';
import { WALLET_PROVIDERS, POPULAR_CRYPTOS } from '../lib/cryptoData';
import { CryptoPrice } from '../lib/types';
export function LandingPage() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${POPULAR_CRYPTOS.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCryptoPrices(data);
        }
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse-slow"
            style={{
              animationDelay: '2s'
            }}>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8
            }}>

            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-sm font-medium mb-6 backdrop-blur-md">
              🚀 The #1 Crypto Bonus Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
              Get{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                30% Bonus
              </span>{' '}
              on
              <br />
              Your Crypto Assets
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect your wallet, verify your assets, and instantly claim a 30%
              bonus on your holdings. Secure, fast, and trusted by millions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/bonus"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center">

                Claim Your Bonus <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/prices"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-neon-purple/50 transition-all duration-300 flex items-center justify-center">

                View Live Prices <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.4
            }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-neon-cyan" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">2M+</h3>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-3">
                <Gift className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">5M+</h3>
              <p className="text-gray-400 text-sm">Bonuses Claimed</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-3">
                <DollarSign className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">$80M+</h3>
              <p className="text-gray-400 text-sm">Total Distributed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crypto Ticker */}
      {cryptoPrices.length > 0 &&
      <div className="w-full bg-black/30 border-y border-white/5 py-4 overflow-hidden">
          <div className="flex space-x-12 whitespace-nowrap ticker-scroll">
            {[...cryptoPrices, ...cryptoPrices].map((coin, index) =>
          <div
            key={`${coin.id}-${index}`}
            className="flex items-center space-x-3 min-w-[200px]">

                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span className="font-bold text-white">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="text-gray-300">
                  ${coin.current_price?.toLocaleString() ?? '—'}
                </span>
                <span
              className={
              (coin.price_change_percentage_24h ?? 0) >= 0 ?
              'text-neon-green' :
              'text-neon-pink'
              }>

                  {coin.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
                </span>
              </div>
          )}
          </div>
        </div>
      }

      {/* Supported Wallets */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">
              Supported <span className="text-neon-cyan">Wallets</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We support all major crypto wallets. Connect securely and claim
              your bonus instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {WALLET_PROVIDERS.map((wallet) =>
            <motion.div
              key={wallet.name}
              whileHover={{
                scale: 1.05
              }}
              className="glass-card p-6 rounded-xl flex flex-col items-center justify-center gap-4 group cursor-pointer">

                <div className="w-16 h-16 relative">
                  <img
                  src={wallet.logo}
                  alt={wallet.name}
                  className="w-full h-full object-contain" />

                  <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="font-medium text-white group-hover:text-neon-cyan transition-colors">
                  {wallet.name}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">
              How It <span className="text-neon-purple">Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Claiming your bonus is simple, secure, and takes less than 2
              minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              icon: Wallet,
              title: '1. Connect Wallet',
              desc: 'Select your wallet provider and enter your wallet address securely.',
              color: 'text-neon-cyan',
              border: 'border-neon-cyan/30'
            },
            {
              icon: ShieldCheck,
              title: '2. Verify Assets',
              desc: 'Our system instantly verifies your holdings to calculate your 30% bonus.',
              color: 'text-neon-purple',
              border: 'border-neon-purple/30'
            },
            {
              icon: Gift,
              title: '3. Claim Bonus',
              desc: 'Receive your bonus directly to your dashboard and withdraw instantly.',
              color: 'text-neon-green',
              border: 'border-neon-green/30'
            }].
            map((step, i) =>
            <div
              key={i}
              className={`glass-card p-8 rounded-2xl border ${step.border} relative overflow-hidden group`}>

                <div
                className={`absolute top-0 right-0 p-4 text-6xl font-bold opacity-10 ${step.color}`}>

                  {i + 1}
                </div>
                <div
                className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 ${step.color} group-hover:scale-110 transition-transform duration-300`}>

                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Market Data Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold font-display mb-4">
                Market <span className="text-neon-green">Trends</span>
              </h2>
              <p className="text-gray-400">
                Live prices from top cryptocurrencies.
              </p>
            </div>
            <Link
              to="/prices"
              className="hidden md:flex items-center text-neon-cyan hover:text-white transition-colors">

              View All Assets <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {cryptoPrices.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cryptoPrices.slice(0, 8).map((coin) =>
            <div key={coin.id} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full" />

                    <div>
                      <h4 className="font-bold text-white">{coin.name}</h4>
                      <span className="text-xs text-gray-400 uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-bold text-white">
                      ${coin.current_price?.toLocaleString() ?? '—'}
                    </span>
                    <span
                  className={`text-sm font-medium ${(coin.price_change_percentage_24h ?? 0) >= 0 ? 'text-neon-green' : 'text-neon-pink'}`}>

                      {(coin.price_change_percentage_24h ?? 0) > 0 ? '+' : ''}
                      {coin.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
                    </span>
                  </div>
                </div>
            )}
            </div> :

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) =>
            <div
              key={i}
              className="glass-card p-6 rounded-xl animate-pulse">

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10"></div>
                    <div>
                      <div className="h-4 w-20 bg-white/10 rounded"></div>
                      <div className="h-3 w-10 bg-white/5 rounded mt-1"></div>
                    </div>
                  </div>
                  <div className="h-6 w-24 bg-white/10 rounded"></div>
                </div>
            )}
            </div>
          }

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/prices"
              className="inline-flex items-center text-neon-cyan hover:text-white transition-colors">

              View All Assets <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-8">
            Ready to Claim Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
              30% Bonus?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join over 2 million users who have already claimed their crypto
            rewards. Don't miss out on this limited time offer.
          </p>
          <Link
            to="/bonus"
            className="inline-flex items-center px-10 py-5 rounded-full bg-white text-black font-bold text-xl hover:bg-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-105">

            Claim Now <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>);

}