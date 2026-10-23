import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { AttendanceRecord } from '../../types';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Calendar,
  Filter,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

interface AttendanceViewProps {
  currentLang: Language;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ currentLang }) => {
  const { user, role } = useAuth();

  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att_001',
      sessionId: 'sess_live_101',
      lessonTitle: 'Module 4: WebRTC Peer Connections & Video Stages',
      classroomId: 'cls_sod_401',
      classroomName: 'Senior 5: Web Architecture & React Applications',
      userId: 'usr_student_1',
      studentName: 'Thierry Ishimwe',
      studentClass: 'Senior 5 SOD',
      joinedAt: '2026-10-21T10:00:12Z',
      durationMinutes: 25,
      status: 'present',
      notes: 'Active participant, webcam active, answered quiz question.'
    },
    {
      id: 'att_002',
      sessionId: 'sess_live_100',
      lessonTitle: 'Module 3: REST API Security & JWT Lifecycle',
      classroomId: 'cls_sod_401',
      classroomName: 'Senior 5: Web Architecture & React Applications',
      userId: 'usr_student_1',
      studentName: 'Thierry Ishimwe',
      studentClass: 'Senior 5 SOD',
      joinedAt: '2026-10-19T14:02:00Z',
      leftAt: '2026-10-19T15:30:00Z',
      durationMinutes: 88,
      status: 'present',
      notes: 'On-time attendance verified.'
    },
    {
      id: 'att_003',
      sessionId: 'sess_live_099',
      lessonTitle: 'Module 2: TypeScript Generics & Type Guards',
      classroomId: 'cls_sod_401',
      classroomName: 'Senior 5: Web Architecture & React Applications',
      userId: 'usr_student_1',
      studentName: 'Thierry Ishimwe',
      studentClass: 'Senior 5 SOD',
      joinedAt: '2026-10-17T14:15:00Z',
      leftAt: '2026-10-17T15:30:00Z',
      durationMinutes: 75,
      status: 'late',
      notes: 'Joined 15 minutes after session start.'
    }
  ]);

  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Session,Classroom,Student,Joined,Duration (mins),Status,Notes']
        .concat(
          records.map(
            r =>
              `"${r.lessonTitle}","${r.classroomName}","${r.studentName}","${r.joinedAt}","${r.durationMinutes}","${r.status}","${r.notes || ''}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartClass_Attendance_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Official Attendance CSV Report downloaded successfully.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const calculateRate = () => {
    const presentCount = records.filter(r => r.status === 'present').length;
    return Math.round((presentCount / records.length) * 100);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-teal-400" />
            <span>Attendance & Classroom Session Records</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Server-verified live session duration calculations, late arrival tracking, and audit records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-teal-400" />
          <span>Export Attendance CSV</span>
        </button>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Live Sessions</div>
          <div className="text-2xl font-bold text-white mt-1">{records.length}</div>
          <div className="text-[11px] text-teal-400 mt-1">Recorded by WebRTC server</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Verified Attendance Rate</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{calculateRate()}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Eligible for Term Certificate</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Minutes Attended</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">
            {records.reduce((acc, r) => acc + r.durationMinutes, 0)} mins
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active video/audio duration</div>
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">
            Official Session Audit History
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">UTC Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Lesson & Subject</th>
                <th className="py-3 px-4">Classroom</th>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Teacher Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                    {r.lessonTitle}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{r.classroomName}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                    {new Date(r.joinedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-400">{r.durationMinutes} mins</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        r.status === 'present'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800'
                      }`}
                    >
                      {r.status === 'present' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                      )}
                      <span className="capitalize">{r.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] italic">
                    {r.notes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
