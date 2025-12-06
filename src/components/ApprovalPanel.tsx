import { useState } from 'react';
import { FileText, Check, X, Eye } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  type: 'enlace' | 'padrino';
  dpi: string;
  profession: string;
  region: string;
  date: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  documents: string[];
}

export default function ApprovalPanel() {
  const [activeTab, setActiveTab] = useState<'todas' | 'enlaces' | 'padrinos'>('todas');

  const applications: Application[] = [
    {
      id: '1',
      name: 'María García López',
      type: 'enlace',
      dpi: '1234 56789 0101',
      profession: 'Licenciada en Biología',
      region: 'Suroccidente - Quetzaltenango',
      date: '01/12/2024',
      status: 'pendiente',
      documents: ['DPI.pdf', 'RENAS.pdf', 'Titulo.pdf', 'CV.pdf', 'Colegiacion.pdf']
    },
    {
      id: '2',
      name: 'Carlos Méndez Ramírez',
      type: 'padrino',
      dpi: '9876 54321 0101',
      profession: 'Doctor en Física - Universidad San Carlos',
      region: 'Norte - Alta Verapaz',
      date: '02/12/2024',
      status: 'pendiente',
      documents: ['DPI.pdf', 'RENAS.pdf', 'Titulo.pdf', 'CV.pdf', 'Colegiacion.pdf']
    },
    {
      id: '3',
      name: 'Ana Rodríguez Pérez',
      type: 'enlace',
      dpi: '5555 66666 0101',
      profession: 'Ingeniera Química',
      region: 'Noroccidente - Huehuetenango',
      date: '03/12/2024',
      status: 'pendiente',
      documents: ['DPI.pdf', 'RENAS.pdf', 'Titulo.pdf', 'CV.pdf', 'Colegiacion.pdf']
    },
  ];

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'todas') return true;
    if (activeTab === 'enlaces') return app.type === 'enlace';
    if (activeTab === 'padrinos') return app.type === 'padrino';
    return true;
  });

  const handleApprove = (id: string) => {
    alert(`Solicitud ${id} aprobada`);
  };

  const handleReject = (id: string) => {
    alert(`Solicitud ${id} rechazada`);
  };

  const enlacesCount = applications.filter(a => a.type === 'enlace').length;
  const padrinosCount = applications.filter(a => a.type === 'padrino').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1e3a5f] mb-2">Panel de Aprobaciones</h1>
        <p className="text-gray-600">Aprobar o rechazar solicitudes de Enlaces y Padrinos</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('todas')}
          className={`px-6 py-3 -mb-px transition-colors ${
            activeTab === 'todas'
              ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
              : 'text-gray-600 hover:text-[#1e3a5f]'
          }`}
        >
          Todas ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('enlaces')}
          className={`px-6 py-3 -mb-px transition-colors ${
            activeTab === 'enlaces'
              ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
              : 'text-gray-600 hover:text-[#1e3a5f]'
          }`}
        >
          Enlaces ({enlacesCount})
        </button>
        <button
          onClick={() => setActiveTab('padrinos')}
          className={`px-6 py-3 -mb-px transition-colors ${
            activeTab === 'padrinos'
              ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
              : 'text-gray-600 hover:text-[#1e3a5f]'
          }`}
        >
          Padrinos ({padrinosCount})
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <div key={app.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl text-[#1e3a5f] mb-1">{app.name}</h3>
                    <span className={`badge ${
                      app.type === 'enlace' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {app.type === 'enlace' ? 'Enlace Voluntario' : 'Padrino/Madrina'}
                    </span>
                  </div>
                  <span className="badge badge-pending">PENDIENTE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">DPI:</span>
                    <span className="ml-2 text-gray-800">{app.dpi}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fecha de solicitud:</span>
                    <span className="ml-2 text-gray-800">{app.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Profesión:</span>
                    <span className="ml-2 text-gray-800">{app.profession}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Región:</span>
                    <span className="ml-2 text-gray-800">{app.region}</span>
                  </div>
                </div>

                {/* Documents */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Documentos Adjuntos ({app.documents.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {app.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors"
                      >
                        <FileText className="w-4 h-4 text-[#c1272d]" />
                        <span>{doc}</span>
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-3">
                <button
                  onClick={() => handleReject(app.id)}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex-1 lg:flex-initial justify-center"
                >
                  <X className="w-4 h-4" />
                  RECHAZAR
                </button>
                <button
                  onClick={() => handleApprove(app.id)}
                  className="flex items-center gap-2 bg-[#28a745] hover:bg-[#1e7e34] text-white px-6 py-2 rounded-lg transition-colors flex-1 lg:flex-initial justify-center"
                >
                  <Check className="w-4 h-4" />
                  APROBAR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
