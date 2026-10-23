import React from 'react';
import { translations, Language } from '../../lib/i18n';
import {
  Megaphone,
  Bell,
  Calendar,
  UserCheck,
  School,
  ExternalLink
} from 'lucide-react';

interface AnnouncementsViewProps {
  currentLang: Language;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ currentLang }) => {
  const announcements = [
    {
      id: 'ann_01',
      title: 'National Software Engineering Hackathon 2026 Announced',
      content:
        'Registration is officially open for all Senior 5 and Senior 6 Software Development (SOD) students. Build practical software applications using the SmartClass Dev IDE. The national jury will evaluate code structure, offline capability, and database normalization. First place winners receive national innovation stipends and internship placements.',
      author: 'Claire Uwase',
      role: 'Dean of Studies (School Admin)',
      date: 'October 20, 2026',
      scope: 'school',
      targetName: 'All SOD Students'
    },
    {
      id: 'ann_02',
      title: 'SOD-401 Live Session Today at 10:00 AM UTC',
      content:
        'Please join promptly using passcode LIVE77. The lecture will examine the WebRTC SDP handshake, STUN/TURN routing, and client isolation inside sandboxed iframes. Make sure you have reviewed Chapter 1 of Modern Web Architecture in the Digital Library.',
      author: 'Eric Manzi',
      role: 'Lead Software Faculty (Teacher)',
      date: 'October 21, 2026',
      scope: 'classroom',
      targetName: 'SOD-401 Web Architecture'
    },
    {
      id: 'ann_03',
      title: 'System Upgrade: Offline Sync Engine & Pyodide Integration',
      content:
        'SmartClass Dev version 2.4 is deployed. Students can now write, execute, and store Python algorithms 100% offline using IndexedDB browser persistence. Synchronization with classroom records resumes automatically upon network restoration.',
      author: 'Dr. Jean-Paul Kagabo',
      role: 'National EdTech Council (Super Admin)',
      date: 'October 18, 2026',
      scope: 'all',
      targetName: 'Platform-wide'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-amber-400" />
          <span>Official School Announcements</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Verified academic notices, hackathon schedules, and national examination schedules.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 self-start">
                Audience: {ann.targetName}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </span>
            </div>

            <h3 className="font-extrabold text-base text-white">{ann.title}</h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {ann.content}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  Author: <strong className="text-slate-200">{ann.author}</strong> ({ann.role})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
