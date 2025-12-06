import { useAuth } from '../context/AuthContext';
import { Users, School, UserCheck, Heart, Download, Settings, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import VisualizadorDashboard from './VisualizadorDashboard';
import PadrinoDashboard from './PadrinoDashboard';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to appropriate dashboard based on role
  useEffect(() => {
    if (user?.role === 'enlace') {
      navigate('/dashboard/clubs');
    }
  }, [user?.role, navigate]);

  // Show appropriate dashboard based on role
  if (user?.role === 'visualizador') {
    return <VisualizadorDashboard />;
  }

  if (user?.role === 'padrino') {
    return <PadrinoDashboard />;
  }

  if (user?.role === 'enlace') {
    return null; // Will redirect in useEffect
  }

  const stats = [
    { label: 'Clubes Activos', value: '105', icon: School, color: 'bg-blue-500' },
    { label: 'Participantes', value: '1,800', icon: Users, color: 'bg-green-500' },
    { label: 'Enlaces', value: '130', icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Padrinos/Madrinas', value: '95', icon: Heart, color: 'bg-red-500' },
  ];

  const regionData = [
    { region: 'Norte', clubes: 28 },
    { region: 'Suroccidente', clubes: 35 },
    { region: 'Noroccidente', clubes: 22 },
    { region: 'Oriente', clubes: 20 },
  ];

  const genderData = [
    { name: 'Masculino', value: 52, color: '#4a90e2' },
    { name: 'Femenino', value: 48, color: '#c1272d' },
  ];

  const recentActivities = [
    { id: 1, text: 'Nuevo club registrado: "Exploradores del Futuro"', status: 'APROBADO', date: '05/12/2024' },
    { id: 2, text: 'Solicitud de enlace: Ana María Rodríguez', status: 'PENDIENTE', date: '05/12/2024' },
    { id: 3, text: 'Club actualizado: "Pequeños Científicos"', status: 'APROBADO', date: '04/12/2024' },
    { id: 4, text: 'Nuevo padrino: Ing. Roberto Gómez', status: 'PENDIENTE', date: '04/12/2024' },
    { id: 5, text: 'Solicitud de enlace rechazada', status: 'RECHAZADO', date: '03/12/2024' },
  ];

  const getDashboardByRole = () => {
    if (user?.role === 'visualizador') {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800">
            <strong>Vista de Solo Lectura:</strong> Usted puede visualizar toda la información pero no puede realizar cambios
          </p>
        </div>
      );
    }

    if (user?.role === 'padrino') {
      return null; // Padrinos tienen su propia vista
    }

    return null;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl text-[#1e3a5f] mb-2">
            Panel de Control {user?.role === 'super_admin' && '- Super Administrador'}
          </h1>
          <p className="text-gray-600">Bienvenido, {user?.name}</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 bg-[#28a745] text-white px-4 py-2 rounded-lg hover:bg-[#1e7e34] transition-colors">
            <Download className="w-4 h-4" />
            Exportar Datos
          </button>
          {user?.role === 'super_admin' && (
            <button className="flex items-center gap-2 bg-[#6c757d] text-white px-4 py-2 rounded-lg hover:bg-[#5a6268] transition-colors">
              <Settings className="w-4 h-4" />
              Configuración
            </button>
          )}
        </div>
      </div>

      {getDashboardByRole()}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl text-[#1e3a5f]">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-xl text-[#1e3a5f] mb-4">Clubes por Región</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clubes" fill="#1e3a5f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-xl text-[#1e3a5f] mb-4">Participantes por Sexo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-[#1e3a5f]">Notificaciones Recientes</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <p className="text-gray-800">{activity.text}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
              </div>
              <span className={`badge ${
                activity.status === 'PENDIENTE' ? 'badge-pending' :
                activity.status === 'APROBADO' ? 'badge-approved' :
                'badge-rejected'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}