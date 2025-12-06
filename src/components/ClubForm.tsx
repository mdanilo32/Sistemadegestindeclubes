import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ClubForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: isEditing ? 'Pequeños Científicos' : '',
    establecimiento: isEditing ? 'Escuela Oficial Rural Mixta' : '',
    tipo: isEditing ? 'Pública' : '',
    region: isEditing ? 'Suroccidente' : '',
    departamento: isEditing ? 'Quetzaltenango' : '',
    municipio: isEditing ? 'Quetzaltenango' : '',
    direccion: isEditing ? 'Zona 1, Centro del Municipio' : '',
    padrino: isEditing ? 'Dr. Carlos Méndez' : '',
    descripcion: isEditing ? 'Club dedicado a las ciencias naturales y experimentos' : '',
    fechaInicio: isEditing ? '2024-08-15' : '',
    horario: isEditing ? 'Martes y Jueves 15:00-17:00' : '',
  });

  const regiones = ['Norte', 'Suroccidente', 'Noroccidente', 'Oriente'];
  const departamentos = {
    'Norte': ['Alta Verapaz', 'Baja Verapaz', 'Petén'],
    'Suroccidente': ['Quetzaltenango', 'Retalhuleu', 'San Marcos'],
    'Noroccidente': ['Huehuetenango', 'Quiché'],
    'Oriente': ['Chiquimula', 'Jutiapa', 'Zacapa']
  };

  const padrinos = [
    'Sin asignar',
    'Dr. Carlos Méndez',
    'Ing. Ana Rodríguez',
    'Lic. Roberto Gómez',
    'Dra. María Fernández'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'region') {
      setFormData(prev => ({ ...prev, departamento: '', municipio: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEditing ? 'Club actualizado exitosamente' : 'Club creado exitosamente');
    navigate('/dashboard/clubs');
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
        <h1 className="text-3xl text-[#1e3a5f] mb-2">
          {isEditing ? 'Editar Club' : 'Crear Nuevo Club'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Modifique la información del club' : 'Complete el formulario para registrar un nuevo club'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información del Club */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Información del Club</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Nombre del Club *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Ej: Pequeños Científicos"
              />
            </div>
            <div>
              <label>Nombre del Establecimiento Educativo *</label>
              <input
                type="text"
                name="establecimiento"
                value={formData.establecimiento}
                onChange={handleInputChange}
                required
                placeholder="Ej: Escuela Oficial Rural Mixta"
              />
            </div>
            <div className="md:col-span-2">
              <label>Tipo de Institución *</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="Pública"
                    checked={formData.tipo === 'Pública'}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4"
                  />
                  <span>Pública</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="Privada"
                    checked={formData.tipo === 'Privada'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Privada</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Ubicación del Club */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Ubicación del Club</h2>
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
            <div className="md:col-span-3">
              <label>Dirección Exacta *</label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                rows={2}
                placeholder="Ingrese la dirección completa del establecimiento"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Asignación de Padrino */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Asignación de Padrino (Opcional)</h2>
          <div>
            <label>Seleccionar Padrino/Madrina</label>
            <select
              name="padrino"
              value={formData.padrino}
              onChange={handleInputChange}
            >
              {padrinos.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Los padrinos/madrinas podrán visualizar la información de este club
            </p>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Información Adicional</h2>
          <div className="space-y-4">
            <div>
              <label>Descripción del Club</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describa las actividades y objetivos del club..."
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Horario de Sesiones</label>
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Ej: Martes y Jueves 15:00-17:00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/clubs')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#1e3a5f] hover:bg-[#152d47] text-white py-3 rounded-lg transition-colors"
          >
            {isEditing ? 'GUARDAR CAMBIOS' : 'GUARDAR CLUB'}
          </button>
        </div>
      </form>
    </div>
  );
}
