import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Heart,
  BarChart3,
  CheckSquare,
  Settings,
  LogOut,
  Beaker,
  Menu,
  X,
  UserCircle
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['super_admin', 'visualizador', 'enlace', 'padrino'] },
    { id: 'clubes', icon: Users, label: 'Mis Clubes', path: '/dashboard/clubs', roles: ['super_admin', 'enlace'] },
    { id: 'enlaces', icon: UserCheck, label: 'Enlaces', path: '/dashboard/clubs', roles: ['super_admin'] },
    { id: 'padrinos', icon: Heart, label: 'Padrinos/Madrinas', path: '/dashboard/clubs', roles: ['super_admin'] },
    { id: 'reportes', icon: BarChart3, label: 'Reportes', path: '/dashboard/reports', roles: ['super_admin', 'visualizador', 'enlace'] },
    { id: 'aprobaciones', icon: CheckSquare, label: 'Aprobaciones', path: '/dashboard/approvals', roles: ['super_admin'] },
    { id: 'config', icon: Settings, label: 'Configuración', path: '/dashboard', roles: ['super_admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <aside className={`bg-[#1e3a5f] text-white w-64 fixed h-full z-20 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Beaker className="w-8 h-8" />
            <div>
              <div className="text-sm">Clubes de Ciencias</div>
              <div className="text-xs text-white/70">SENACYT Guatemala</div>
            </div>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? 'bg-[#c1272d]' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 mb-2"
          >
            <UserCircle className="w-5 h-5" />
            <div className="text-left flex-1">
              <div className="text-sm">{user?.name}</div>
              <div className="text-xs text-white/70">
                {user?.role === 'super_admin' && 'Super Admin'}
                {user?.role === 'enlace' && 'Enlace'}
                {user?.role === 'visualizador' && 'Visualizador'}
                {user?.role === 'padrino' && 'Padrino'}
              </div>
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Beaker className="w-6 h-6 text-[#1e3a5f]" />
            <span className="text-[#1e3a5f]">SENACYT</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}