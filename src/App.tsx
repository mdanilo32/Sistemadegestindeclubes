import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import ApprovalPanel from './components/ApprovalPanel';
import RegisterEnlace from './components/RegisterEnlace';
import RegisterPadrino from './components/RegisterPadrino';
import ClubManagement from './components/ClubManagement';
import ClubForm from './components/ClubForm';
import ParticipantManagement from './components/ParticipantManagement';
import ParticipantForm from './components/ParticipantForm';
import VisualizadorDashboard from './components/VisualizadorDashboard';
import PadrinoDashboard from './components/PadrinoDashboard';
import Reports from './components/Reports';
import UserProfile from './components/UserProfile';

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string[] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register/enlace" element={<RegisterEnlace />} />
      <Route path="/register/padrino" element={<RegisterPadrino />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="approvals" element={
          <ProtectedRoute requiredRole={['super_admin']}>
            <ApprovalPanel />
          </ProtectedRoute>
        } />
        <Route path="clubs" element={<ClubManagement />} />
        <Route path="clubs/new" element={<ClubForm />} />
        <Route path="clubs/:id/edit" element={<ClubForm />} />
        <Route path="clubs/:id/participants" element={<ParticipantManagement />} />
        <Route path="clubs/:id/participants/new" element={<ParticipantForm />} />
        <Route path="visualizador" element={<VisualizadorDashboard />} />
        <Route path="padrino" element={<PadrinoDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
