import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  User,
  Mail,
  School,
  Award,
  BookOpen,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

interface ProfileViewProps {
  currentLang: Language;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentLang }) => {
  const { user, role } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 border border-blue-800/40 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user?.firstName}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-500 shadow-2xl"
          />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 ring-4 ring-slate-900" />
        </div>

        <div className="text-center sm:text-left flex-1 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold uppercase">
            <span>Role: {user?.role.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-xs text-slate-300">
            {user?.className} • Trade: <strong>{user?.sectionTrade}</strong>
          </p>
          <div className="text-xs text-slate-400 flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{user?.email}</span>
            </span>
            <span className="flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-indigo-400" />
              <span>{user?.schoolName}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">1</div>
          <div className="text-[11px] text-slate-400">Certificate Earned</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <FolderGit2 className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">2</div>
          <div className="text-[11px] text-slate-400">Practical Projects</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <Clock className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">94%</div>
          <div className="text-[11px] text-slate-400">Attendance Rate</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">Verified</div>
          <div className="text-[11px] text-slate-400">Account Standing</div>
        </div>
      </div>

      {/* Account Details & Enrolled Classrooms */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
          Academic Profile Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400">National Registration Number:</span>
            <div className="font-mono text-slate-200 mt-0.5">RW-TVET-2026-SOD-00918</div>
          </div>
          <div>
            <span className="text-slate-400">Campus Institution:</span>
            <div className="font-semibold text-slate-200 mt-0.5">Kigali Tech Innovation Academy</div>
          </div>
          <div>
            <span className="text-slate-400">Primary Curriculum Track:</span>
            <div className="font-semibold text-slate-200 mt-0.5">Software Development (SOD L4/L5)</div>
          </div>
          <div>
            <span className="text-slate-400">Faculty Supervisor:</span>
            <div className="font-semibold text-slate-200 mt-0.5">Eric Manzi (Lead Software Faculty)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
