import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Club {
  id: string;
  nombre: string;
  region: string;
  departamento: string;
  municipio: string;
  tipo: 'Pública' | 'Privada';
  participantes: number;
}

export default function ClubManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  const clubs: Club[] = [
    {
      id: '1',
      nombre: 'Pequeños Científicos',
      region: 'Suroccidente',
      departamento: 'Quetzaltenango',
      municipio: 'Quetzaltenango',
      tipo: 'Pública',
      participantes: 23
    },
    {
      id: '2',
      nombre: 'Exploradores del Futuro',
      region: 'Norte',
      departamento: 'Alta Verapaz',
      municipio: 'Cobán',
      tipo: 'Privada',
      participantes: 18
    },
    {
      id: '3',
      nombre: 'Inventores Creativos',
      region: 'Suroccidente',
      departamento: 'Quetzaltenango',
      municipio: 'San Marcos',
      tipo: 'Pública',
      participantes: 15
    },
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !filterRegion || club.region === filterRegion;
    const matchesTipo = !filterTipo || club.tipo === filterTipo;
    return matchesSearch && matchesRegion && matchesTipo;
  });

  const canEdit = user?.role === 'super_admin' || user?.role === 'enlace';

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl text-[#1e3a5f] mb-2">
            {user?.role === 'enlace' ? 'Mis Clubes de Ciencias' : 'Gestión de Clubes'}
          </h1>
          <p className="text-gray-600">
            {canEdit ? 'Administre y gestione los clubes de ciencias' : 'Visualice los clubes de ciencias'}
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => navigate('/dashboard/clubs/new')}
            className="flex items-center gap-2 bg-[#c1272d] hover:bg-[#a01f24] text-white px-6 py-3 rounded-lg transition-colors mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            Crear Nuevo Club
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="">Todas las regiones</option>
              <option value="Norte">Norte</option>
              <option value="Suroccidente">Suroccidente</option>
              <option value="Noroccidente">Noroccidente</option>
              <option value="Oriente">Oriente</option>
            </select>
          </div>
          <div>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              <option value="Pública">Pública</option>
              <option value="Privada">Privada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clubs Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Club</th>
              <th>Región</th>
              <th>Departamento</th>
              <th>Municipio</th>
              <th>Tipo</th>
              <th>Participantes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClubs.map((club) => (
              <tr key={club.id}>
                <td>{club.nombre}</td>
                <td>{club.region}</td>
                <td>{club.departamento}</td>
                <td>{club.municipio}</td>
                <td>
                  <span className={`badge ${
                    club.tipo === 'Pública' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {club.tipo}
                  </span>
                </td>
                <td>{club.participantes}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/clubs/${club.id}/participants`)}
                      className="flex items-center gap-1 bg-[#4a90e2] hover:bg-[#1e3a5f] text-white px-3 py-1 rounded text-sm transition-colors"
                      title="Ver participantes"
                    >
                      <Users className="w-4 h-4" />
                      Ver
                    </button>
                    {canEdit && (
                      <button
                        onClick={() => navigate(`/dashboard/clubs/${club.id}/edit`)}
                        className="flex items-center gap-1 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1 rounded text-sm transition-colors"
                        title="Editar club"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-gray-600">Mostrando {filteredClubs.length} de {clubs.length} clubes</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
            Anterior
          </button>
          <button className="px-4 py-2 bg-[#1e3a5f] text-white rounded">1</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">2</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
