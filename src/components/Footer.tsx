import React from 'react';
import { Link } from 'react-router-dom';
import {
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
  MapPin } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/Favicon.png"
                alt="NeonCrypto"
                className="w-8 h-8 object-contain" />

              <span className="text-xl font-bold text-white">
                Neon<span className="text-neon-cyan">Crypto</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The premier platform for crypto bonuses and asset management.
              Secure, fast, and rewarding.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-neon-cyan transition-colors">

                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-purple transition-colors">

                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors">

                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-green transition-colors">

                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/bonus"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Claim Bonus
                </Link>
              </li>
              <li>
                <Link
                  to="/prices"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Live Prices
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm">

                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  111 W 57th St Unit Quadplex 80, New York, NY 10019
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-neon-purple flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  support@neoncrypto.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NeonCrypto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}