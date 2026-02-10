import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Bonus',
    path: '/bonus'
  },
  {
    name: 'Prices',
    path: '/prices'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <img
                src="/Favicon.png"
                alt="NeonCrypto Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />

              <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold font-display tracking-tight">
              <span className="text-white">Neon</span>
              <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                Crypto
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 hover:text-neon-cyan hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] ${isActive(link.path) ? 'text-neon-cyan drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]' : 'text-gray-300'}`}>

                {link.name}
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ?
            <div className="flex items-center space-x-4">
                <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group">

                  <LayoutDashboard className="w-4 h-4 text-neon-purple group-hover:text-neon-cyan" />
                  <span className="text-sm font-medium text-white">
                    Dashboard
                  </span>
                </Link>
                <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Logout">

                  <LogOut className="w-5 h-5" />
                </button>
              </div> :

            <div className="flex items-center space-x-4">
                <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

                  Login
                </Link>
                <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-105">

                  Sign Up
                </Link>
              </div>
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none">

              {isOpen ?
              <X className="w-6 h-6" /> :

              <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen &&
      <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'text-neon-cyan bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>

                {link.name}
              </Link>
          )}

            <div className="pt-4 border-t border-white/10 mt-4">
              {user ?
            <>
                  <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">

                    Dashboard
                  </Link>
                  <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">

                    Logout
                  </button>
                </> :

            <>
                  <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">

                    Login
                  </Link>
                  <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-neon-cyan hover:text-white hover:bg-white/5">

                    Sign Up
                  </Link>
                </>
            }
            </div>
          </div>
        </div>
      }
    </nav>);

}