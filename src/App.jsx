import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import UserLayout from './pages/User/UserLayout';
import './App.css';

/**
 * AppRouter — the single "role switch" component.
 * Reads the auth state and renders the correct interface:
 *   - null  → Login page
 *   - admin → Admin Dashboard
 *   - user  → Public website with User toolbar
 */
function AppRouter() {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Login />;
  if (isAdmin)      return <AdminLayout />;
  return <UserLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
