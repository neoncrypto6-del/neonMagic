import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
// Pages
import { LandingPage } from './pages/LandingPage';
import { BonusPage } from './pages/BonusPage';
import { CongratulationsPage } from './pages/CongratulationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PricesPage } from './pages/PricesPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WithdrawPage } from './pages/WithdrawPage';
export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg text-white selection:bg-neon-cyan selection:text-black">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/bonus" element={<BonusPage />} />
              <Route
                path="/congratulations"
                element={<CongratulationsPage />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/prices" element={<PricesPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
            </Routes>
          </main>
          <Footer />
          <NotificationToast />
        </div>
      </Router>
    </AuthProvider>);

}