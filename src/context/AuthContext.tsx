import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'visualizador' | 'enlace' | 'padrino';
  region?: string;
  profession?: string;
  clubsAssigned?: number;
  totalParticipants?: number;
  registrationDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login con diferentes roles
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUsers: { [key: string]: User } = {
      'admin@senacyt.gob.gt': {
        id: '1',
        name: 'Nilo',
        email: 'admin@senacyt.gob.gt',
        role: 'super_admin',
        registrationDate: '01/01/2024'
      },
      'enlace@senacyt.gob.gt': {
        id: '2',
        name: 'María García López',
        email: 'enlace@senacyt.gob.gt',
        role: 'enlace',
        region: 'Suroccidente - Quetzaltenango',
        profession: 'Licenciada en Biología',
        clubsAssigned: 3,
        totalParticipants: 56,
        registrationDate: '01/08/2024'
      },
      'visualizador@senacyt.gob.gt': {
        id: '3',
        name: 'Dr. Juan Pérez',
        email: 'visualizador@senacyt.gob.gt',
        role: 'visualizador',
        profession: 'Licenciado en Física',
        registrationDate: '15/03/2024'
      },
      'padrino@senacyt.gob.gt': {
        id: '4',
        name: 'Dr. Carlos Méndez',
        email: 'padrino@senacyt.gob.gt',
        role: 'padrino',
        profession: 'Universidad San Carlos',
        registrationDate: '10/05/2024'
      }
    };

    const foundUser = mockUsers[email];
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
