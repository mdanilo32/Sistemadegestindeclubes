import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle, FileText, Eye, Lock, Save } from 'lucide-react';

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'docs' | 'security'>('info');

  const [formData, setFormData] = useState({
    nombres: user?.name.split(' ')[0] || '',
    apellidos: user?.name.split(' ').slice(1).join(' ') || '',
    profesion: user?.profession || '',
    email: user?.email || '',
    telefono: '7777-1234',
    fechaNacimiento: '1990-05-15'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const documents = [
    { name: 'DPI.pdf', size: '2.3 MB', date: '01/08/2024' },
    { name: 'RENAS.pdf', size: '1.8 MB', date: '01/08/2024' },
    { name: 'Titulo.pdf', size: '3.1 MB', date: '01/08/2024' },
    { name: 'CV.pdf', size: '1.2 MB', date: '01/08/2024' },
    { name: 'Colegiacion.pdf', size: '2.0 MB', date: '01/08/2024' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: `${formData.nombres} ${formData.apellidos}`,
      profession: formData.profesion,
      email: formData.email
    });
    alert('Información actualizada correctamente');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Contraseña cambiada correctamente');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Administrador';
      case 'enlace': return 'Enlace Voluntario';
      case 'visualizador': return 'Visualizador';
      case 'padrino': return 'Padrino/Madrina';
      default: return role;
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-[#1e3a5f] mb-6">Perfil de Usuario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#1e3a5f] rounded-full p-8">
                <UserCircle className="w-24 h-24 text-white" />
              </div>
            </div>
            <h2 className="text-2xl text-[#1e3a5f] mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-4">{getRoleName(user?.role || '')}</p>
            <span className="badge badge-active inline-block mb-6">Cuenta Activa</span>

            <div className="text-left space-y-3 border-t border-gray-200 pt-4">
              <div>
                <p className="text-sm text-gray-600">Región Asignada</p>
                <p className="text-gray-800">{user?.region || 'No asignada'}</p>
              </div>
              {user?.clubsAssigned !== undefined && (
                <div>
                  <p className="text-sm text-gray-600">Clubes a cargo</p>
                  <p className="text-gray-800">{user.clubsAssigned}</p>
                </div>
              )}
              {user?.totalParticipants !== undefined && (
                <div>
                  <p className="text-sm text-gray-600">Participantes totales</p>
                  <p className="text-gray-800">{user.totalParticipants}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Fecha de registro</p>
                <p className="text-gray-800">{user?.registrationDate || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 -mb-px transition-colors ${
                activeTab === 'info'
                  ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
                  : 'text-gray-600 hover:text-[#1e3a5f]'
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-6 py-3 -mb-px transition-colors ${
                activeTab === 'docs'
                  ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
                  : 'text-gray-600 hover:text-[#1e3a5f]'
              }`}
            >
              Documentos
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 -mb-px transition-colors ${
                activeTab === 'security'
                  ? 'border-b-2 border-[#1e3a5f] text-[#1e3a5f]'
                  : 'text-gray-600 hover:text-[#1e3a5f]'
              }`}
            >
              Seguridad
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="card">
              <h3 className="text-xl text-[#1e3a5f] mb-4">Información Personal</h3>
              <form onSubmit={handleSaveInfo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Nombres</label>
                    <input
                      type="text"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label>DPI (Solo lectura)</label>
                    <input
                      type="text"
                      value="1234 56789 0101"
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label>Profesión</label>
                    <input
                      type="text"
                      name="profesion"
                      value={formData.profesion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#152d47] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </form>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="card">
              <h3 className="text-xl text-[#1e3a5f] mb-4">Documentos Subidos</h3>
              <p className="text-sm text-gray-600 mb-4">Documentos presentados durante el registro</p>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#c1272d]" />
                      <div>
                        <p className="text-gray-800">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.size} - Subido el {doc.date}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#4a90e2] hover:bg-[#1e3a5f] text-white px-4 py-2 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h3 className="text-xl text-[#1e3a5f] mb-4">Seguridad</h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label>Contraseña Actual *</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Ingrese su contraseña actual"
                  />
                </div>
                <div>
                  <label>Nueva Contraseña *</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                  />
                </div>
                <div>
                  <label>Confirmar Nueva Contraseña *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Repita su nueva contraseña"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#c1272d] hover:bg-[#a01f24] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
