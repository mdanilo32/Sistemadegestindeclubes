import { Eye, Users, School, UserCheck, Heart } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VisualizadorDashboard() {
  const stats = [
    { label: 'Clubes Activos', value: '105', icon: School, color: 'bg-blue-500' },
    { label: 'Participantes', value: '1,800', icon: Users, color: 'bg-green-500' },
    { label: 'Enlaces', value: '130', icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Padrinos/Madrinas', value: '95', icon: Heart, color: 'bg-red-500' },
  ];

  const regionData = [
    { region: 'Norte', clubes: 28, porcentaje: '27%' },
    { region: 'Suroccidente', clubes: 35, porcentaje: '33%' },
    { region: 'Noroccidente', clubes: 22, porcentaje: '21%' },
    { region: 'Oriente', clubes: 20, porcentaje: '19%' },
  ];

  const genderData = [
    { name: 'Masculino', value: 52, color: '#4a90e2' },
    { name: 'Femenino', value: 48, color: '#c1272d' },
  ];

  const recentClubs = [
    { id: 1, nombre: 'Exploradores del Futuro', region: 'Norte', participantes: 18, fecha: '05/12/2024' },
    { id: 2, nombre: 'Inventores Creativos', region: 'Suroccidente', participantes: 15, fecha: '04/12/2024' },
    { id: 3, nombre: 'Científicos del Mañana', region: 'Oriente', participantes: 20, fecha: '03/12/2024' },
  ];

  return (
    <div>
      {/* Read-Only Alert */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800">
              <strong>Vista de Solo Lectura:</strong> Usted puede visualizar toda la información pero no puede realizar cambios
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1e3a5f] mb-2">Panel de Visualización</h1>
        <p className="text-gray-600">Vista general del sistema de clubes de ciencias</p>
      </div>

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
          <h3 className="text-xl text-[#1e3a5f] mb-4">Distribución por Región</h3>
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
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {regionData.map(r => (
              <div key={r.region} className="flex justify-between p-2 bg-gray-50 rounded">
                <span>{r.region}:</span>
                <span className="text-[#1e3a5f]">{r.porcentaje}</span>
              </div>
            ))}
          </div>
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
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-2xl text-[#4a90e2]">52%</div>
              <div className="text-sm text-gray-600">Masculino</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded">
              <div className="text-2xl text-[#c1272d]">48%</div>
              <div className="text-sm text-gray-600">Femenino</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Clubs Table */}
      <div className="card">
        <h3 className="text-xl text-[#1e3a5f] mb-4">Últimos Clubes Registrados</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre del Club</th>
                <th>Región</th>
                <th>Participantes</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              {recentClubs.map(club => (
                <tr key={club.id}>
                  <td>{club.nombre}</td>
                  <td>{club.region}</td>
                  <td>{club.participantes}</td>
                  <td>{club.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center p-3 bg-gray-50 rounded">
          Vista de solo lectura - No hay opciones de edición disponibles
        </div>
      </div>
    </div>
  );
}
