import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ParticipantForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    edad: '',
    sexo: '',
    club: 'Pequeños Científicos',
    fechaIngreso: new Date().toISOString().split('T')[0],
    nombreTutor: '',
    telefonoTutor: '',
    observaciones: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calcular edad automáticamente
    if (name === 'fechaNacimiento' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, edad: age.toString() }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const edad = parseInt(formData.edad);
    if (edad < 5 || edad > 18) {
      alert('La edad debe estar entre 5 y 18 años');
      return;
    }

    alert('Participante agregado exitosamente');
    navigate(`/dashboard/clubs/${id}/participants`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/dashboard/clubs/${id}/participants`)}
          className="flex items-center gap-2 text-[#4a90e2] hover:text-[#1e3a5f] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Participantes
        </button>
        <h1 className="text-3xl text-[#1e3a5f] mb-2">Agregar Participante</h1>
        <p className="text-gray-600">Complete el formulario para registrar un nuevo participante</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del Participante */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Datos del Participante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Nombres *</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                required
                placeholder="Nombres del participante"
              />
            </div>
            <div>
              <label>Apellidos *</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                required
                placeholder="Apellidos del participante"
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
              <label>Edad (5-18 años) *</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                required
                min="5"
                max="18"
                placeholder="Edad calculada automáticamente"
                readOnly={!!formData.fechaNacimiento}
              />
            </div>
            <div className="md:col-span-2">
              <label>Sexo *</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sexo"
                    value="Masculino"
                    checked={formData.sexo === 'Masculino'}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4"
                  />
                  <span>Masculino</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sexo"
                    value="Femenino"
                    checked={formData.sexo === 'Femenino'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Femenino</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Información del Club */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Información del Club</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Club Asignado *</label>
              <input
                type="text"
                name="club"
                value={formData.club}
                readOnly
                className="bg-gray-100"
              />
              <p className="text-sm text-gray-600 mt-1">Club pre-seleccionado</p>
            </div>
            <div>
              <label>Fecha de Ingreso al Club *</label>
              <input
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Contacto (Opcional) */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Contacto (Opcional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Nombre del Padre/Madre/Tutor</label>
              <input
                type="text"
                name="nombreTutor"
                value={formData.nombreTutor}
                onChange={handleInputChange}
                placeholder="Nombre completo del tutor"
              />
            </div>
            <div>
              <label>Teléfono de Contacto</label>
              <input
                type="tel"
                name="telefonoTutor"
                value={formData.telefonoTutor}
                onChange={handleInputChange}
                placeholder="1234-5678"
              />
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div className="card">
          <h2 className="text-xl text-[#1e3a5f] mb-4">Observaciones</h2>
          <div>
            <label>Notas Adicionales</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              rows={4}
              placeholder="Información adicional relevante sobre el participante..."
              className="w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/clubs/${id}/participants`)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#1e3a5f] hover:bg-[#152d47] text-white py-3 rounded-lg transition-colors"
          >
            GUARDAR PARTICIPANTE
          </button>
        </div>
      </form>
    </div>
  );
}
