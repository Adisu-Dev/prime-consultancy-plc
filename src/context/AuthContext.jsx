import { createContext, useContext, useState } from 'react';

/**
 * AuthContext — Role-based authentication
 *
 * Roles:
 *   'super_admin'      → Full access to all admin sections
 *   'content_manager'  → Blog & Services only
 *   'marketing_manager'→ Inquiries & Blog only
 *   'user'             → Public website only
 *
 * In production replace mockUsers with real API calls + JWT tokens.
 */

const AuthContext = createContext(null);

// ── Mock credential store ─────────────────────────────────────────
const mockUsers = [
  // Super Admins — full access
  {
    id: 1, email: 'admin@prime.et', password: 'Admin@123',
    role: 'super_admin', name: 'Solomon Bekele', avatar: null,
  },
  {
    id: 4, email: 'adisu@prime.et', password: 'Adisu@123',
    role: 'super_admin', name: 'Adisu Dereje', avatar: null,
  },
  // Content Manager — Blog & Services
  {
    id: 3, email: 'content@prime.et', password: 'Content@123',
    role: 'content_manager', name: 'Mulugeta Girma', avatar: null,
  },
  // Marketing Manager — Inquiries & Blog
  {
    id: 6, email: 'marketing@prime.et', password: 'Marketing@123',
    role: 'marketing_manager', name: 'Hiwot Kebede', avatar: null,
  },
  // Regular users — public website only
  {
    id: 2, email: 'user@prime.et', password: 'User@123',
    role: 'user', name: 'Adisu Dereje', avatar: null,
  },
  {
    id: 5, email: 'adisu.user@prime.et', password: 'Adisu@123',
    role: 'user', name: 'Adisu Dereje', avatar: null,
  },
];

// ── Permission map per role ───────────────────────────────────────
export const ROLE_PERMISSIONS = {
  super_admin: {
    label: 'Super Admin',
    canAccess: ['dashboard', 'appointments', 'inquiries', 'services', 'blog'],
    color: '#1B3A6B',
  },
  content_manager: {
    label: 'Content Manager',
    canAccess: ['services', 'blog'],
    color: '#059669',
  },
  marketing_manager: {
    label: 'Marketing Manager',
    canAccess: ['inquiries', 'blog'],
    color: '#7C3AED',
  },
  user: {
    label: 'User',
    canAccess: [],
    color: '#374151',
  },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError]     = useState('');
  const [loading, setLoading]         = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError('');
    await new Promise(r => setTimeout(r, 700));
    const found = mockUsers.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    setLoading(false);
    if (found) {
      setCurrentUser(found);
      return { ok: true, role: found.role };
    } else {
      setAuthError('Invalid email or password. Please try again.');
      return { ok: false };
    }
  };

  const logout = () => { setCurrentUser(null); setAuthError(''); };

  const isAdminRole = currentUser &&
    ['super_admin', 'content_manager', 'marketing_manager'].includes(currentUser.role);

  const isUser  = currentUser?.role === 'user';
  const isAdmin = isAdminRole; // legacy alias

  /** Check if current user can access a specific admin section */
  const canAccess = (section) => {
    if (!currentUser) return false;
    return ROLE_PERMISSIONS[currentUser.role]?.canAccess.includes(section) ?? false;
  };

  return (
    <AuthContext.Provider value={{
      currentUser, isAdmin, isUser, isAdminRole,
      login, logout, authError, loading, canAccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
