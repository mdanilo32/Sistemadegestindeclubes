import { useState } from 'react';
import { Download, Filter, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExportModal from './ExportModal';

export default function Reports() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [filters, setFilters] = useState({
    periodo: '2024',
    region: '',
    tipo: ''
  });

  const institucionData = [
    { name: 'Públicas', value: 68, count: 71, color: '#28a745' },
    { name: 'Privadas', value: 32, count: 34, color: '#4a90e2' }
  ];

  const regionData = [
    { region: 'Norte', clubes: 28, porcentaje: 27, color: '#4a90e2' },
    { region: 'Suroccidente', clubes: 35, porcentaje: 33, color: '#28a745' },
    { region: 'Noroccidente', clubes: 22, porcentaje: 21, color: '#ffc107' },
    { region: 'Oriente', clubes: 20, porcentaje: 19, color: '#c1272d' }
  ];

  const crecimientoData = [
    { mes: 'Ago', participantes: 1200 },
    { mes: 'Sep', participantes: 1350 },
    { mes: 'Oct', participantes: 1500 },
    { mes: 'Nov', participantes: 1650 },
    { mes: 'Dic', participantes: 1800 }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl text-[#1e3a5f] mb-2">Reportes y Análisis</h1>
          <p className="text-gray-600">Análisis interactivo de datos del sistema</p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 bg-[#28a745] hover:bg-[#1e7e34] text-white px-6 py-3 rounded-lg transition-colors mt-4 md:mt-0"
        >
          <Download className="w-5 h-5" />
          Exportar Reporte Completo
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#1e3a5f]" />
          <h3 className="text-lg text-[#1e3a5f]">Filtros de Análisis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Período</label>
            <select
              name="periodo"
              value={filters.periodo}
              onChange={handleFilterChange}
            >
              <option value="2024">2024 - Todo el año</option>
              <option value="2024-12">Diciembre 2024</option>
              <option value="2024-11">Noviembre 2024</option>
              <option value="2024-10">Octubre 2024</option>
            </select>
          </div>
          <div>
            <label>Región</label>
            <select
              name="region"
              value={filters.region}
              onChange={handleFilterChange}
            >
              <option value="">Todas las regiones</option>
              <option value="Norte">Norte</option>
              <option value="Suroccidente">Suroccidente</option>
              <option value="Noroccidente">Noroccidente</option>
              <option value="Oriente">Oriente</option>
            </select>
          </div>
          <div>
            <label>Tipo de Institución</label>
            <select
              name="tipo"
              value={filters.tipo}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="publica">Pública</option>
              <option value="privada">Privada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart 1: Instituciones Públicas vs Privadas */}
      <div className="card mb-6">
        <h3 className="text-xl text-[#1e3a5f] mb-4">Instituciones Públicas vs Privadas</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={institucionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {institucionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-4">
            {institucionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-[#1e3a5f]">{item.count}</div>
                  <div className="text-sm text-gray-600">{item.value}% del total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 2: Distribución Geográfica */}
      <div className="card mb-6">
        <h3 className="text-xl text-[#1e3a5f] mb-4">Distribución Geográfica</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clubes" fill="#1e3a5f" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {regionData.map((region) => (
            <div
              key={region.region}
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: `${region.color}15` }}
            >
              <div
                className="text-3xl mb-1"
                style={{ color: region.color }}
              >
                {region.clubes}
              </div>
              <div className="text-sm text-gray-600">{region.region}</div>
              <div className="text-xs text-gray-500">{region.porcentaje}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 3: Crecimiento de Participantes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-[#1e3a5f]">Crecimiento de Participantes</h3>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-600">+50% de crecimiento</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={crecimientoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="participantes"
              stroke="#1e3a5f"
              strokeWidth={3}
              dot={{ fill: '#c1272d', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {crecimientoData.map((data) => (
            <div key={data.mes} className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{data.mes}</div>
              <div className="text-xl text-[#1e3a5f]">{data.participantes.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
