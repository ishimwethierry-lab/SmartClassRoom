import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  LayoutDashboard,
  Mail,
  Video,
  Sparkles,
  BookOpen,
  Library,
  Code2,
  FolderGit2,
  HelpCircle,
  Clock,
  Film,
  Award,
  Bell,
  Megaphone,
  User,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentLang: Language;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  currentLang,
  mobileOpen,
  onCloseMobile,
  unreadCount = 2
}) => {
  const { role } = useAuth();
  const t = translations[currentLang].nav;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'inbox', label: t.inbox, icon: Mail, badge: unreadCount },
    { id: 'live-classroom', label: t.liveClassroom, icon: Video, pulseBadge: 'LIVE' },
    { id: 'soma-ai', label: t.somaAI, icon: Sparkles, highlight: true },
    { id: 'courses', label: t.courses, icon: BookOpen },
    { id: 'library', label: t.library, icon: Library },
    { id: 'coding-ide', label: t.codingIDE, icon: Code2, hot: true },
    { id: 'projects', label: t.projects, icon: FolderGit2 },
    { id: 'quizzes', label: t.quizzes, icon: HelpCircle },
    { id: 'attendance', label: t.attendance, icon: Clock },
    { id: 'recordings', label: t.recordings, icon: Film },
    { id: 'certificates', label: t.certificates, icon: Award },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'announcements', label: t.announcements, icon: Megaphone },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'settings', label: t.settings, icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header Close */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800 lg:hidden">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation Menu
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Academic Suite
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : item.highlight ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.pulseBadge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                      {item.pulseBadge}
                    </span>
                  )}
                  {item.hot && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      IDE
                    </span>
                  )}
                  {item.badge ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500 text-white min-w-4 text-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Organization Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">Active Campus</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Rwanda TVET • SOD Dept</p>
          </div>
        </div>
      </aside>
    </>
  );
};
