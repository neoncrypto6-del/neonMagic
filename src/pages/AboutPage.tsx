import React from 'react';
import { Shield, Users, Globe, Award } from 'lucide-react';
export function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            About <span className="text-neon-cyan">NeonCrypto</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are building the future of crypto rewards. Our mission is to
            empower users to maximize their digital asset potential through
            secure, transparent, and generous bonus programs.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card p-10 rounded-2xl border-l-4 border-neon-purple">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To democratize access to crypto wealth by providing a seamless
              platform where users can instantly increase their portfolio value.
              We believe in rewarding early adopters and long-term holders of
              cryptocurrency.
            </p>
          </div>
          <div className="glass-card p-10 rounded-2xl border-l-4 border-neon-cyan">
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A world where crypto assets work harder for you. We envision an
              ecosystem where liquidity is rewarded, and users are incentivized
              to maintain and grow their digital portfolios securely.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
          {
            icon: Users,
            label: 'Active Users',
            value: '2M+',
            color: 'text-neon-cyan'
          },
          {
            icon: Globe,
            label: 'Countries Supported',
            value: '150+',
            color: 'text-neon-purple'
          },
          {
            icon: Shield,
            label: 'Secure Transactions',
            value: '100%',
            color: 'text-neon-green'
          },
          {
            icon: Award,
            label: 'Industry Awards',
            value: '12',
            color: 'text-neon-pink'
          }].
          map((stat, i) =>
          <div
            key={i}
            className="glass-card p-8 rounded-xl text-center hover:bg-white/5 transition-colors">

              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          )}
        </div>

        {/* Story Section */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">
              Why Choose NeonCrypto?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-neon-cyan mb-4">
                  Unmatched Security
                </h3>
                <p className="text-gray-400">
                  We utilize state-of-the-art encryption and cold storage
                  solutions to ensure your data and potential rewards are always
                  protected.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon-purple mb-4">
                  Instant Verification
                </h3>
                <p className="text-gray-400">
                  Our proprietary algorithm verifies wallet holdings in
                  milliseconds, allowing for instant bonus calculation and
                  allocation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon-green mb-4">
                  Global Compliance
                </h3>
                <p className="text-gray-400">
                  We operate with full transparency and adhere to international
                  regulatory standards to provide a sustainable platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}