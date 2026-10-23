import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { UserRole } from '../../types';
import {
  Eye,
  EyeOff,
  School,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LoginViewProps {
  onSwitchToRegister: () => void;
  currentLang: Language;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSwitchToRegister, currentLang }) => {
  const { login } = useAuth();
  const t = translations[currentLang];

  const [email, setEmail] = useState('student@smartclass.dev');
  const [password, setPassword] = useState('password123');
  const [selectedClassroom, setSelectedClassroom] = useState('SOD-401');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const demoAccounts: Array<{ label: string; email: string; role: UserRole; badge: string }> = [
    { label: 'Student', email: 'student@smartclass.dev', role: 'student', badge: 'SOD-501' },
    { label: 'Teacher', email: 'teacher@smartclass.dev', role: 'teacher', badge: 'Faculty' },
    { label: 'School Admin', email: 'admin@smartclass.dev', role: 'school_admin', badge: 'Dean' },
    { label: 'Super Admin', email: 'superadmin@smartclass.dev', role: 'super_admin', badge: 'National' },
    { label: 'Mentor', email: 'mentor@smartclass.dev', role: 'mentor', badge: 'SOD-601' },
    { label: 'Parent', email: 'parent@smartclass.dev', role: 'parent', badge: 'Guardian' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const success = await login(email);
      if (!success) {
        setErrorMessage('Invalid credentials. Please verify your email and password.');
      }
    } catch {
      setErrorMessage('Network connection error. Offline login allowed for cached students.');
    } finally {
      setLoading(false);
    }
  };

  const selectDemoAccount = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword('password123');
    login(acc.email, acc.role);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Headline */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white text-2xl mx-auto shadow-xl shadow-blue-500/25">
            SC
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            SmartClass <span className="text-blue-400">Dev</span>
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            "{t.tagline}"
          </p>
          <div className="text-[11px] text-slate-400">
            Rwanda TVET & National Software Engineering Academy
          </div>
        </div>

        {/* Quick Demo Switcher Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
            <span>Instant Demo Sign-In (Select Role)</span>
            <span className="text-emerald-400">6 Roles Available</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => selectDemoAccount(acc)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-colors text-xs"
              >
                <div className="font-bold text-slate-200 truncate">{acc.label}</div>
                <div className="text-[10px] text-blue-400 font-mono truncate">{acc.badge}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@smartclass.dev"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {t.password}
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link dispatched to registered institution email.');
                  }}
                  className="text-[11px] text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 5.1 Classroom Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Classroom
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={selectedClassroom}
                  onChange={(e) => setSelectedClassroom(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="SOD-401">Senior 5: Web Architecture & React (SOD-401)</option>
                  <option value="SOD-502">Senior 5: Backend API Engineering (SOD-502)</option>
                  <option value="SOD-601">Senior 6: Systems Programming & C/Rust (SOD-601)</option>
                </select>
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{t.login}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration link */}
          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Don't have an account yet? </span>
            <button
              onClick={onSwitchToRegister}
              className="text-blue-400 hover:text-blue-300 font-bold"
            >
              {t.register}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
