import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, ArrowLeft, Download, Users, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Participant {
  id: string;
  nombre: string;
  edad: number;
  sexo: 'Masculino' | 'Femenino';
  fechaIngreso: string;
}

export default function ParticipantManagement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSexo, setFilterSexo] = useState('');

  const participants: Participant[] = [
    { id: '1', nombre: 'María José González', edad: 12, sexo: 'Femenino', fechaIngreso: '15/08/2024' },
    { id: '2', nombre: 'Carlos Andrés Pérez', edad: 13, sexo: 'Masculino', fechaIngreso: '15/08/2024' },
    { id: '3', nombre: 'Ana Lucía Ramírez', edad: 11, sexo: 'Femenino', fechaIngreso: '20/08/2024' },
    { id: '4', nombre: 'José Miguel Torres', edad: 14, sexo: 'Masculino', fechaIngreso: '22/08/2024' },
    { id: '5', nombre: 'Sofía Elena Morales', edad: 12, sexo: 'Femenino', fechaIngreso: '25/08/2024' },
  ];

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSexo = !filterSexo || p.sexo === filterSexo;
    return matchesSearch && matchesSexo;
  });

  const totalMasculino = participants.filter(p => p.sexo === 'Masculino').length;
  const totalFemenino = participants.filter(p => p.sexo === 'Femenino').length;

  const canEdit = user?.role === 'super_admin' || user?.role === 'enlace';

  const handleDelete = (participantId: string) => {
    if (confirm('¿Está seguro de eliminar este participante?')) {
      alert(`Participante ${participantId} eliminado`);
    }
  };

  const handleExport = () => {
    alert('Exportando lista a Excel...');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/clubs')}
          className="flex items-center gap-2 text-[#4a90e2] hover:text-[#1e3a5f] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Clubes
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl text-[#1e3a5f] mb-2">Participantes del Club</h1>
            <p className="text-gray-600">Club: Pequeños Científicos - Quetzaltenango</p>
          </div>
          {canEdit && (
            <button
              onClick={() => navigate(`/dashboard/clubs/${id}/participants/new`)}
              className="flex items-center gap-2 bg-[#c1272d] hover:bg-[#a01f24] text-white px-6 py-3 rounded-lg transition-colors mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              Agregar Participante
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stat-card bg-[#1e3a5f] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Total Participantes</p>
              <p className="text-4xl">{participants.length}</p>
            </div>
            <Users className="w-12 h-12 text-white/50" />
          </div>
        </div>
        <div className="stat-card bg-[#4a90e2] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Masculino</p>
              <p className="text-4xl">{totalMasculino}</p>
            </div>
            <User className="w-12 h-12 text-white/50" />
          </div>
        </div>
        <div className="stat-card bg-[#c1272d] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Femenino</p>
              <p className="text-4xl">{totalFemenino}</p>
            </div>
            <User className="w-12 h-12 text-white/50" />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="md:w-64">
            <select
              value={filterSexo}
              onChange={(e) => setFilterSexo(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-[#28a745] hover:bg-[#1e7e34] text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar a Excel
          </button>
        </div>
      </div>

      {/* Participants Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Completo</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Fecha Ingreso</th>
              {canEdit && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((participant, index) => (
              <tr key={participant.id}>
                <td>{index + 1}</td>
                <td>{participant.nombre}</td>
                <td>{participant.edad} años</td>
                <td>
                  <span className={`badge ${
                    participant.sexo === 'Masculino' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                  }`}>
                    {participant.sexo}
                  </span>
                </td>
                <td>{participant.fechaIngreso}</td>
                {canEdit && (
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(participant.id)}
                        className="flex items-center gap-1 bg-[#c1272d] hover:bg-[#a01f24] text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-gray-600">
        Mostrando {filteredParticipants.length} de {participants.length} participantes
      </div>
    </div>
  );
}
