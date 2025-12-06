import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, ArrowLeft, AlertCircle, Info } from 'lucide-react';

export default function RegisterPadrino() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dpi: '',
    fechaNacimiento: '',
    profesion: '',
    email: '',
    telefono: '',
    region: '',
    departamento: '',
    municipio: '',
    organizacion: '',
    regionApadrinar: '',
    motivacion: '',
    usuario: '',
    password: '',
    confirmPassword: ''
  });

  const [documents, setDocuments] = useState({
    dpi: null as File | null,
    renas: null as File | null,
    titulo: null as File | null,
    cv: null as File | null,
    colegiacion: null as File | null,
  });

  const regiones = ['Norte', 'Suroccidente', 'Noroccidente', 'Oriente'];
  const departamentos = {
    'Norte': ['Alta Verapaz', 'Baja Verapaz', 'Petén'],
    'Suroccidente': ['Quetzaltenango', 'Retalhuleu', 'San Marcos'],
    'Noroccidente': ['Huehuetenango', 'Quiché'],
    'Oriente': ['Chiquimula', 'Jutiapa', 'Zacapa']
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'region') {
      setFormData(prev => ({ ...prev, departamento: '', municipio: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: keyof typeof documents) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [docType]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.dpi.replace(/\s/g, '').length !== 13) {
      alert('El DPI debe tener 13 dígitos');
      return;
    }

    alert('Solicitud enviada correctamente. Estado: PENDIENTE DE APROBACIÓN. Tendrá acceso de solo lectura.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[#4a90e2] hover:text-[#1e3a5f] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Login
          </button>
          <h1 className="text-3xl text-[#1e3a5f] mb-2">Registro de Padrinos/Madrinas</h1>
          <p className="text-gray-600">Complete el formulario para apadrinar clubes de ciencias</p>
        </div>

        {/* Warning Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800">
                <strong>Acceso de Solo Lectura:</strong> Los Padrinos/Madrinas tienen acceso de visualización únicamente. 
                NO podrán ingresar datos de clubes ni participantes, SOLO podrán visualizar los clubes que apadrinan.
              </p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800">
                <strong>Importante:</strong> Su solicitud será revisada por un Super Administrador. 
                Una vez aprobada, podrá visualizar la información de los clubes que apadrine.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Personales */}
          <div className="card">
            <h2 className="text-xl text-[#1e3a5f] mb-4">Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Nombres Completos *</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingrese sus nombres"
                />
              </div>
              <div>
                <label>Apellidos Completos *</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingrese sus apellidos"
                />
              </div>
              <div>
                <label>Número de DPI (13 dígitos) *</label>
                <input
                  type="text"
                  name="dpi"
                  value={formData.dpi}
                  onChange={handleInputChange}
                  required
                  placeholder="1234 56789 0101"
                  maxLength={16}
                />
              </div>
              <div>
                <label>Fecha de Nacimiento *</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Profesión *</label>
                <input
                  type="text"
                  name="profesion"
                  value={formData.profesion}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Doctor en Física"
                />
              </div>
              <div>
                <label>Organización/Empresa (Opcional)</label>
                <input
                  type="text"
                  name="organizacion"
                  value={formData.organizacion}
                  onChange={handleInputChange}
                  placeholder="Ej: Universidad San Carlos"
                />
              </div>
              <div>
                <label>Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  placeholder="1234-5678"
                />
              </div>
            </div>
          </div>

          {/* Ubicación Geográfica */}
          <div className="card">
            <h2 className="text-xl text-[#1e3a5f] mb-4">Ubicación Geográfica</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label>Región *</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una región</option>
                  {regiones.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Departamento *</label>
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.region}
                >
                  <option value="">Seleccione un departamento</option>
                  {formData.region && departamentos[formData.region as keyof typeof departamentos]?.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Municipio *</label>
                <input
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleInputChange}
                  required
                  placeholder="Nombre del municipio"
                />
              </div>
            </div>
          </div>

          {/* Información de Apadrinamiento */}
          <div className="card">
            <h2 className="text-xl text-[#1e3a5f] mb-4">Información de Apadrinamiento</h2>
            <div className="space-y-4">
              <div>
                <label>¿En qué región desea apadrinar clubes? *</label>
                <select
                  name="regionApadrinar"
                  value={formData.regionApadrinar}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una región</option>
                  {regiones.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Motivación para ser Padrino/Madrina *</label>
                <textarea
                  name="motivacion"
                  value={formData.motivacion}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Cuéntenos por qué desea apadrinar clubes de ciencias..."
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Documentos Requeridos */}
          <div className="card">
            <h2 className="text-xl text-[#1e3a5f] mb-4">Documentos Requeridos</h2>
            <p className="text-sm text-gray-600 mb-4">Formatos aceptados: PDF, JPG, JPEG - Tamaño máximo: 5MB</p>
            <div className="space-y-4">
              {[
                { key: 'dpi', label: '1. DPI' },
                { key: 'renas', label: '2. RENAS' },
                { key: 'titulo', label: '3. Título Universitario' },
                { key: 'cv', label: '4. Currículum Vitae' },
                { key: 'colegiacion', label: '5. Colegiación' },
              ].map(doc => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#4a90e2] transition-colors">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="flex-1">{doc.label}</span>
                    {documents[doc.key as keyof typeof documents] && (
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{documents[doc.key as keyof typeof documents]?.name}</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, doc.key as keyof typeof documents)}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Credenciales de Acceso */}
          <div className="card">
            <h2 className="text-xl text-[#1e3a5f] mb-4">Credenciales de Acceso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label>Nombre de Usuario *</label>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  required
                  placeholder="Nombre de usuario único"
                />
              </div>
              <div>
                <label>Contraseña *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                />
              </div>
              <div>
                <label>Confirmar Contraseña *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Repita su contraseña"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#1e3a5f] hover:bg-[#152d47] text-white py-3 rounded-lg transition-colors"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
