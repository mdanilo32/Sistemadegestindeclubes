import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Beaker, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas. Intente nuevamente.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Icono del Sistema */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#1e3a5f] rounded-full p-4">
            <Beaker className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-center text-2xl text-[#1e3a5f] mb-6">
          Iniciar Sesión
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Demo Credentials Helper */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
          <p className="mb-2"><strong>Credenciales de prueba:</strong></p>
          <ul className="space-y-1 text-xs">
            <li>• Super Admin: admin@senacyt.gob.gt</li>
            <li>• Enlace: enlace@senacyt.gob.gt</li>
            <li>• Visualizador: visualizador@senacyt.gob.gt</li>
            <li>• Padrino: padrino@senacyt.gob.gt</li>
            <li>• Contraseña: demo123</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email">Usuario o Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Contraseña</label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#1e3a5f] border-gray-300 rounded focus:ring-[#4a90e2]"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 mb-0">
              Recordar sesión
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a5f] hover:bg-[#152d47] text-white py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {/* Forgot Password */}
          <div className="text-center">
            <a href="#" className="text-sm text-[#4a90e2] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        {/* Separator */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">o</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Register Section */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">¿Primera vez en el sistema?</p>
          <button
            onClick={() => navigate('/register/enlace')}
            className="w-full bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Registrarse como Enlace/Padrino
          </button>
        </div>
      </div>
    </div>
  );
}