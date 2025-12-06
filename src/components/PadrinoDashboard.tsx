import { Heart, MapPin, School, Users, User, Mail, Phone, Eye } from 'lucide-react';

export default function PadrinoDashboard() {
  const clubesApadrinados = [
    {
      id: '1',
      nombre: 'Club Pequeños Científicos',
      region: 'Suroccidente',
      departamento: 'Quetzaltenango',
      establecimiento: 'Escuela Oficial Rural Mixta',
      tipo: 'Pública',
      totalParticipantes: 23,
      masculino: 12,
      femenino: 11,
      enlace: {
        nombre: 'María García López',
        email: 'maria.garcia@senacyt.gob.gt',
        telefono: '7777-1234'
      }
    },
    {
      id: '2',
      nombre: 'Exploradores del Futuro',
      region: 'Suroccidente',
      departamento: 'San Marcos',
      establecimiento: 'Colegio Privado El Saber',
      tipo: 'Privada',
      totalParticipantes: 18,
      masculino: 10,
      femenino: 8,
      enlace: {
        nombre: 'Carlos Ramírez',
        email: 'carlos.ramirez@senacyt.gob.gt',
        telefono: '7777-5678'
      }
    },
    {
      id: '3',
      nombre: 'Inventores Creativos',
      region: 'Suroccidente',
      departamento: 'Quetzaltenango',
      establecimiento: 'Instituto Nacional Mixto',
      tipo: 'Pública',
      totalParticipantes: 15,
      masculino: 8,
      femenino: 7,
      enlace: {
        nombre: 'Ana Rodríguez',
        email: 'ana.rodriguez@senacyt.gob.gt',
        telefono: '7777-9012'
      }
    }
  ];

  const totalParticipantes = clubesApadrinados.reduce((sum, club) => sum + club.totalParticipantes, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1e3a5f] mb-2">Mis Clubes Apadrinados</h1>
        <p className="text-gray-600">Padrino: Dr. Carlos Méndez - Universidad San Carlos</p>
      </div>

      {/* Read-Only Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800">
              <strong>Acceso de Solo Lectura:</strong> Como padrino/madrina, usted puede visualizar la información de los clubes que apadrina, pero no puede realizar cambios.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="stat-card bg-[#c1272d] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Clubes Apadrinados</p>
              <p className="text-4xl">{clubesApadrinados.length}</p>
            </div>
            <Heart className="w-12 h-12 text-white/50" />
          </div>
        </div>
        <div className="stat-card bg-[#1e3a5f] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Total Participantes</p>
              <p className="text-4xl">{totalParticipantes}</p>
            </div>
            <Users className="w-12 h-12 text-white/50" />
          </div>
        </div>
      </div>

      {/* Clubs Cards */}
      <div className="space-y-6">
        {clubesApadrinados.map((club) => (
          <div key={club.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#c1272d] rounded-lg p-3">
                  <School className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-[#1e3a5f] mb-1">{club.nombre}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{club.region} - {club.departamento}</span>
                  </div>
                </div>
              </div>
              <span className={`badge ${
                club.tipo === 'Pública' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {club.tipo}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Club Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Establecimiento</p>
                  <p className="text-gray-800">{club.establecimiento}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Participantes</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 rounded-full p-2">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Masculino</div>
                        <div className="text-lg text-[#1e3a5f]">{club.masculino}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-100 rounded-full p-2">
                        <User className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Femenino</div>
                        <div className="text-lg text-[#1e3a5f]">{club.femenino}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#1e3a5f] rounded-full p-2">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="text-lg text-[#1e3a5f]">{club.totalParticipantes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlace Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">Enlace Responsable</p>
                <div className="space-y-2">
                  <p className="text-[#1e3a5f]">{club.enlace.nombre}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${club.enlace.email}`} className="hover:text-[#4a90e2]">
                      {club.enlace.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${club.enlace.telefono}`} className="hover:text-[#4a90e2]">
                      {club.enlace.telefono}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons (Read-only) */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-[#4a90e2] hover:bg-[#1e3a5f] text-white px-4 py-2 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                Ver Detalles del Club
              </button>
              <button className="flex items-center gap-2 bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-2 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                Ver Lista de Participantes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
