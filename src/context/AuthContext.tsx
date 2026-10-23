import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isOnline: boolean;
  toggleOnline: () => void;
}

const defaultStudents: Record<UserRole, User> = {
  student: {
    id: 'usr_student_1',
    email: 'student@smartclass.dev',
    firstName: 'Thierry',
    lastName: 'Ishimwe',
    className: 'Senior 5 SOD',
    sectionTrade: 'Software Development (SOD)',
    role: 'student',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-01T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  },
  teacher: {
    id: 'usr_teacher_1',
    email: 'teacher@smartclass.dev',
    firstName: 'Eric',
    lastName: 'Manzi',
    className: 'Senior Faculty',
    sectionTrade: 'Lead Software Engineering Faculty',
    role: 'teacher',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-15T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  },
  school_admin: {
    id: 'usr_admin_1',
    email: 'admin@smartclass.dev',
    firstName: 'Claire',
    lastName: 'Uwase',
    className: 'Administration',
    sectionTrade: 'Dean of Studies',
    role: 'school_admin',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  },
  super_admin: {
    id: 'usr_super_1',
    email: 'superadmin@smartclass.dev',
    firstName: 'Dr. Jean-Paul',
    lastName: 'Kagabo',
    className: 'National Directorate',
    sectionTrade: 'National EdTech Council',
    role: 'super_admin',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-07-01T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'SmartClass Dev Central Council'
  },
  mentor: {
    id: 'usr_mentor_1',
    email: 'mentor@smartclass.dev',
    firstName: 'Divine',
    lastName: 'Mutoni',
    className: 'Senior 6 SOD',
    sectionTrade: 'Software Development & Algorithms',
    role: 'mentor',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-20T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  },
  parent: {
    id: 'usr_parent_1',
    email: 'parent@smartclass.dev',
    firstName: 'Patrick',
    lastName: 'Ndayisaba',
    className: 'Parent / Guardian',
    sectionTrade: 'Parent of Thierry Ishimwe',
    role: 'parent',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-02T08:00:00Z',
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultStudents.student);
  const [token, setToken] = useState<string | null>('sc_mock_token_student');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = async (email: string, customRole: UserRole = 'student'): Promise<boolean> => {
    const matched = Object.values(defaultStudents).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      setToken(`sc_token_${matched.id}`);
      return true;
    }
    const targetUser = defaultStudents[customRole] || defaultStudents.student;
    setUser(targetUser);
    setToken(`sc_token_${targetUser.id}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (defaultStudents[newRole]) {
      setUser(defaultStudents[newRole]);
      setToken(`sc_token_${defaultStudents[newRole].id}`);
    }
  };

  const toggleOnline = () => {
    setIsOnline(prev => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        token,
        login,
        logout,
        switchRole,
        isOnline,
        toggleOnline
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
