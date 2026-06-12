import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserProfile from './UserProfile';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Services from '../../components/Services';
import WhyUs from '../../components/WhyUs';
import Industries from '../../components/Industries';
import CaseStudies from '../../components/CaseStudies';
import Testimonials from '../../components/Testimonials';
import Blog from '../../components/Blog';
import Booking from '../../components/Booking';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import './UserLayout.css';

export default function UserLayout() {
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <div className="user-layout">
      {/* Floating user toolbar */}
      <div className="user-toolbar">
        <div className="ut-inner">
          <div className="ut-greeting">
            <span className="ut-avatar">
              {currentUser?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
            <span className="ut-name">
              Welcome, <strong>{currentUser?.name?.split(' ')[0]}</strong>
            </span>
          </div>
          <div className="ut-actions">
            <button className="ut-btn" onClick={() => setShowProfile(true)}>
              👤 My Profile
            </button>
            <button className="ut-btn ut-btn-logout" onClick={logout}>
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Public website */}
      <div className="user-site-wrap">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyUs />
          <Industries />
          <CaseStudies />
          <Testimonials />
          <Blog />
          <Booking />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Profile slide-in */}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}
