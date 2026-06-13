import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import AdminLogin from './pages/Login/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import UserLayout from './pages/User/UserLayout';
import './App.css';

/**
 * Route guard for the public user site (/login → /)
 */
function UserRoute() {
  const { currentUser, isUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isUser)      return <Navigate to="/admin/dashboard" replace />;
  return <UserLayout />;
}

/**
 * Route guard for the admin portal (/admin/*)
 */
function AdminRoute() {
  const { currentUser, isAdminRole } = useAuth();
  if (!currentUser)  return <Navigate to="/admin" replace />;
  if (!isAdminRole)  return <Navigate to="/" replace />;
  return <AdminLayout />;
}

/**
 * Public landing page — accessible without login.
 * If logged in as user → show UserLayout
 * If logged in as admin → redirect to admin
 */
function PublicRoute() {
  const { currentUser, isAdminRole, isUser } = useAuth();
  if (currentUser && isAdminRole) return <Navigate to="/admin/dashboard" replace />;
  if (currentUser && isUser)      return <UserLayout />;
  // Not logged in → show public site without toolbar
  return <PublicSite />;
}

/**
 * Public website shown to non-logged-in visitors
 */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Industries from './components/Industries';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

function PublicSite() {
  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public website ── */}
          <Route path="/"       element={<PublicRoute />} />

          {/* ── User login ── */}
          <Route path="/login"  element={<UserLoginRedirect />} />

          {/* ── Admin portal — separate URL ── */}
          <Route path="/admin"           element={<AdminLoginRedirect />} />
          <Route path="/admin/*"         element={<AdminRoute />} />

          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

/** Show login only if not already authenticated */
function UserLoginRedirect() {
  const { currentUser, isUser, isAdminRole } = useAuth();
  if (currentUser && isAdminRole) return <Navigate to="/admin/dashboard" replace />;
  if (currentUser && isUser)      return <Navigate to="/" replace />;
  return <Login />;
}

function AdminLoginRedirect() {
  const { currentUser, isAdminRole } = useAuth();
  if (currentUser && isAdminRole) return <Navigate to="/admin/dashboard" replace />;
  return <AdminLogin />;
}
