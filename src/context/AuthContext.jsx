import { createContext, useContext, useState } from 'react';

/**
 * AuthContext — mock authentication state manager.
 * In production, replace mockUsers with a real API call.
 * userRole can be: null | 'user' | 'admin'
 */

const AuthContext = createContext(null);

// ── Mock credential store ──────────────────────────────────────────
const mockUsers = [
  { id: 1, email: 'admin@prime.et',      password: 'Admin@123',   role: 'admin', name: 'Solomon Bekele', avatar: null },
  { id: 2, email: 'user@prime.et',       password: 'User@123',    role: 'user',  name: 'Adisu Dereje',   avatar: null },
  { id: 3, email: 'manager@prime.et',    password: 'Manager@123', role: 'admin', name: 'Mulugeta Girma', avatar: null },
  { id: 4, email: 'adisu@prime.et',      password: 'Adisu@123',   role: 'admin', name: 'Adisu Dereje',   avatar: null },
  { id: 5, email: 'adisu.user@prime.et', password: 'Adisu@123',   role: 'user',  name: 'Adisu Dereje',   avatar: null },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);   // null = not logged in
  const [authError, setAuthError]     = useState('');
  const [loading, setLoading]         = useState(false);

  /** Simulate an async login request */
  const login = async (email, password) => {
    setLoading(true);
    setAuthError('');
    await new Promise(r => setTimeout(r, 700)); // fake network delay
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

  const logout = () => {
    setCurrentUser(null);
    setAuthError('');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isUser  = currentUser?.role === 'user';

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, isUser, login, logout, authError, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
