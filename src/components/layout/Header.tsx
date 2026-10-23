import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  Wifi,
  WifiOff,
  Globe,
  Bell,
  UserCheck,
  ShieldAlert,
  LogOut,
  ChevronDown,
  Menu
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleMobileNav: () => void;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onToggleMobileNav,
  onNavigate
}) => {
  const { user, role, switchRole, logout, isOnline, toggleOnline } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const t = translations[currentLang];

  const roleLabels: Record<string, { label: string; badge: string; color: string }> = {
    student: { label: 'Student', badge: 'SOD-501', color: 'bg-blue-900/60 text-blue-300 border-blue-700' },
    teacher: { label: 'Teacher', badge: 'Lead Faculty', color: 'bg-emerald-900/60 text-emerald-300 border-emerald-700' },
    school_admin: { label: 'School Admin', badge: 'Dean of Studies', color: 'bg-amber-900/60 text-amber-300 border-amber-700' },
    super_admin: { label: 'Super Admin', badge: 'National Directorate', color: 'bg-purple-900/60 text-purple-300 border-purple-700' },
    mentor: { label: 'Student Mentor', badge: 'Peer Support', color: 'bg-teal-900/60 text-teal-300 border-teal-700' },
    parent: { label: 'Parent / Guardian', badge: 'Guardian', color: 'bg-slate-800 text-slate-300 border-slate-600' }
  };

  return (
    <header className="h-16 bg-slate-900/95 border-b border-slate-800 text-slate-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 backdrop-blur-md">
      {/* Left: Mobile hamburger & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            SC
          </div>
          <div>
            <div className="font-bold tracking-tight text-base sm:text-lg flex items-center gap-2">
              <span className="text-white">SmartClass</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
                DEV
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block leading-none">
              Kigali Tech Innovation Academy
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Offline / Online Simulator Pill */}
        <button
          onClick={toggleOnline}
          title={isOnline ? 'Online (Click to simulate offline)' : 'Offline (Click to simulate online)'}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
            isOnline
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800 hover:bg-emerald-900/80'
              : 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900/80 animate-pulse'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="font-medium hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span className="font-semibold">Offline Mode</span>
            </>
          )}
        </button>

        {/* Language Selector (EN / RW) */}
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs font-semibold">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-1 rounded-md transition-colors ${
              currentLang === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('rw')}
            className={`px-2 py-1 rounded-md transition-colors ${
              currentLang === 'rw'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            RW
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900" />
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
                <span className="font-semibold text-sm text-slate-200">Recent Notifications</span>
                <span className="text-[11px] text-blue-400 cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer">
                  <div className="font-medium text-slate-200">Live Lesson Starting</div>
                  <div className="text-slate-400 text-[11px]">SOD-401 Web Architecture in session with Eric Manzi</div>
                  <div className="text-[10px] text-blue-400 mt-1">Passcode: LIVE77</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700 cursor-pointer">
                  <div className="font-medium text-slate-200">Assessment Graded</div>
                  <div className="text-slate-400 text-[11px]">WebRTC Signaling Quiz scored 28/30 (93%)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.firstName}
              className="w-6 h-6 rounded-full object-cover border border-slate-600"
            />
            <div className="text-left hidden md:block">
              <div className="font-semibold leading-tight">{user?.firstName} {user?.lastName}</div>
              <div className="text-[10px] text-slate-400">{roleLabels[role]?.badge}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <div className="text-xs text-slate-400">Switch User Role (Demo RBAC)</div>
                <div className="text-[11px] text-blue-400 font-mono">Current: {roleLabels[role]?.label}</div>
              </div>

              {(Object.keys(roleLabels) as Array<keyof typeof roleLabels>).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r as any);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    role === r
                      ? 'bg-blue-600/20 text-blue-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{roleLabels[r].label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${roleLabels[r].color}`}>
                    {roleLabels[r].badge}
                  </span>
                </button>
              ))}

              <div className="mt-2 pt-2 border-t border-slate-800">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
