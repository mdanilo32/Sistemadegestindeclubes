import { useNavigate } from 'react-router-dom';
import { Microscope, Beaker } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] px-4">
      <div className="text-center max-w-3xl">
        {/* Logos */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#1e3a5f] mb-1">SENACYT</div>
              <div className="text-xs text-gray-600">Guatemala</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-32 h-32 flex items-center justify-center">
            <div className="relative">
              <Beaker className="w-12 h-12 text-[#c1272d]" />
              <Microscope className="w-8 h-8 text-[#4a90e2] absolute -bottom-1 -right-1" />
            </div>
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-white text-4xl mb-4">
          Sistema de Gestión de Clubes de Ciencias
        </h1>

        {/* Subtítulo */}
        <p className="text-white/90 text-xl mb-8">
          Secretaría Nacional de Ciencia y Tecnología - Guatemala
        </p>

        {/* Botón de Ingreso */}
        <button
          onClick={() => navigate('/login')}
          className="bg-[#c1272d] hover:bg-[#a01f24] text-white px-12 py-4 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Ingresar al Sistema
        </button>

        {/* Información del Proyecto */}
        <div className="mt-12 text-white/70 text-sm">
          <p>Contrato 47-2025 SENACYT | Diciembre 2024</p>
        </div>
      </div>
    </div>
  );
}