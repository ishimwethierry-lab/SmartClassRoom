import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  Settings,
  Globe,
  Bell,
  HardDrive,
  Trash2,
  Lock,
  Shield,
  CheckCircle2,
  AlertTriangle,
  LogOut
} from 'lucide-react';

interface SettingsViewProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLang,
  onLanguageChange
}) => {
  const { user, logout } = useAuth();
  const [notifyClass, setNotifyClass] = useState(true);
  const [notifyQuiz, setNotifyQuiz] = useState(true);
  const [notifyAnnounce, setNotifyAnnounce] = useState(true);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const handleClearCache = () => {
    if (confirm('Warning: This will clear local IndexedDB project caches and downloaded books. Offline files not synchronized to the server may be lost. Proceed?')) {
      indexedDB.deleteDatabase('SmartClassDev_OfflineStore');
      setAlertMsg('Offline IndexedDB cache cleared successfully.');
      setTimeout(() => setAlertMsg(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-400" />
          <span>System & Account Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure language preferences, notifications, security controls, and offline storage.
        </p>
      </div>

      {alertMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Language Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Language & Regional Localization (i18n)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div
            onClick={() => onLanguageChange('en')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentLang === 'en'
                ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-bold">English (Default)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">International academic standard format</div>
          </div>

          <div
            onClick={() => onLanguageChange('rw')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentLang === 'rw'
                ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-bold">Ikinyarwanda</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ururimi rw\'ikinyarwanda mu burezi bw\'ikoranabuhanga</div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Classroom Event Notifications</span>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 cursor-pointer">
            <div>
              <div className="font-semibold text-slate-200">Live Classroom Session Alerts</div>
              <div className="text-[11px] text-slate-400">Receive alert when a teacher starts broadcasting</div>
            </div>
            <input
              type="checkbox"
              checked={notifyClass}
              onChange={(e) => setNotifyClass(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 cursor-pointer">
            <div>
              <div className="font-semibold text-slate-200">Assessment & Quiz Deadlines</div>
              <div className="text-[11px] text-slate-400">Reminders 24 hours prior to passcode expiration</div>
            </div>
            <input
              type="checkbox"
              checked={notifyQuiz}
              onChange={(e) => setNotifyQuiz(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 cursor-pointer">
            <div>
              <div className="font-semibold text-slate-200">School & Dean Announcements</div>
              <div className="text-[11px] text-slate-400">Push notices from national directorate and campus</div>
            </div>
            <input
              type="checkbox"
              checked={notifyAnnounce}
              onChange={(e) => setNotifyAnnounce(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
            />
          </label>
        </div>
      </div>

      {/* 21 Offline Storage Management */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
          <HardDrive className="w-4 h-4 text-teal-400" />
          <span>Offline Storage & Cache Management</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">IndexedDB Local Cache Usage:</span>
            <span className="font-mono text-teal-400">4.2 MB / 500 MB Quota</span>
          </div>
          <div className="text-[11px] text-slate-400 leading-relaxed">
            Cached resources include: 4 Digital Library books, 2 Practical IDE projects, offline Soma AI curriculum knowledge base, and queued mutation records.
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
              <AlertTriangle className="w-4 h-4" />
              <span>Warning: Clears unsynced local drafts</span>
            </div>
            <button
              onClick={handleClearCache}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Local Cache</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="font-bold text-sm text-white">Sign Out of Current Session</div>
          <div className="text-xs text-slate-400 mt-0.5">Clears session token and returns to login gate</div>
        </div>
        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
