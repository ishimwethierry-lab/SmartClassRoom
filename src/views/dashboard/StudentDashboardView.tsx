import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  Mail,
  School,
  BookOpen,
  HelpCircle,
  FolderGit2,
  Award,
  Clock,
  TrendingUp,
  Video,
  ArrowRight,
  Code2,
  CheckCircle2,
  Sparkles,
  Users,
  Megaphone
} from 'lucide-react';

interface StudentDashboardViewProps {
  onNavigate: (view: string) => void;
  currentLang: Language;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  onNavigate,
  currentLang
}) => {
  const { user, role } = useAuth();
  const t = translations[currentLang].dashboard;

  // Real statistics data
  const stats = [
    {
      id: 'inbox',
      label: t.unreadMessages,
      value: '2',
      subtext: 'Teacher Eric & Academic Office',
      icon: Mail,
      color: 'from-blue-600 to-indigo-600',
      action: () => onNavigate('inbox')
    },
    {
      id: 'classrooms',
      label: t.assignedClassrooms,
      value: '3',
      subtext: 'SOD-401, SOD-502, SOD-601',
      icon: School,
      color: 'from-cyan-600 to-blue-600',
      action: () => onNavigate('courses')
    },
    {
      id: 'subjects',
      label: t.enrolledSubjects,
      value: '5',
      subtext: 'Web, Python, Systems, SQL, Math',
      icon: BookOpen,
      color: 'from-indigo-600 to-purple-600',
      action: () => onNavigate('courses')
    },
    {
      id: 'quizzes',
      label: t.completedQuizzes,
      value: '1 / 2',
      subtext: '93% Avg Score',
      icon: HelpCircle,
      color: 'from-emerald-600 to-teal-600',
      action: () => onNavigate('quizzes')
    },
    {
      id: 'projects',
      label: t.practicalProjects,
      value: '2',
      subtext: 'Web Portal & Python Graph',
      icon: FolderGit2,
      color: 'from-amber-600 to-orange-600',
      action: () => onNavigate('coding-ide')
    },
    {
      id: 'certificates',
      label: t.certificatesEarned,
      value: '1',
      subtext: 'Full-Stack Software Dev',
      icon: Award,
      color: 'from-purple-600 to-pink-600',
      action: () => onNavigate('certificates')
    },
    {
      id: 'attendance',
      label: t.attendanceRate,
      value: '94%',
      subtext: '3 Sessions Verified',
      icon: Clock,
      color: 'from-teal-600 to-emerald-600',
      action: () => onNavigate('attendance')
    },
    {
      id: 'progress',
      label: 'Curriculum Progress',
      value: '78%',
      subtext: 'Senior 5 SOD Term 1',
      icon: TrendingUp,
      color: 'from-rose-600 to-red-600',
      action: () => onNavigate('courses')
    }
  ];

  // Active / Inactive Student Roster
  const classmates = [
    { name: 'Thierry Ishimwe', role: 'Student (You)', online: true, class: 'Senior 5 SOD', activeTask: 'WebRTC Lab' },
    { name: 'Eric Manzi', role: 'Lead Teacher', online: true, class: 'Faculty', activeTask: 'Broadcasting Live' },
    { name: 'Divine Mutoni', role: 'Student Mentor', online: true, class: 'Senior 6 SOD', activeTask: 'Algorithms Assistance' },
    { name: 'Aline Umutoni', role: 'Student', online: true, class: 'Senior 5 SOD', activeTask: 'Taking Quiz' },
    { name: 'Jean de Dieu Habimana', role: 'Student', online: true, class: 'Senior 5 SOD', activeTask: 'Coding in IDE' },
    { name: 'Kevine Uwera', role: 'Student', online: false, class: 'Senior 5 SOD', activeTask: 'Last seen 2h ago' },
    { name: 'Cedric Mugisha', role: 'Student', online: false, class: 'Senior 5 SOD', activeTask: 'Last seen 4h ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SmartClass Dev • Academic Year 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.welcome}, {user?.firstName} {user?.lastName}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Class: <strong className="text-blue-300">{user?.className}</strong> • Trade: <strong className="text-blue-300">{user?.sectionTrade}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('live-classroom')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 transition-all active:scale-95 animate-pulse"
            >
              <Video className="w-4 h-4" />
              <span>Join Live Classroom</span>
            </button>
            <button
              onClick={() => onNavigate('coding-ide')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all active:scale-95"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Open Coding IDE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              onClick={stat.action}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all hover:scale-[1.02] group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 truncate pr-2">{stat.label}</span>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mt-2 tracking-tight">{stat.value}</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 truncate flex items-center justify-between">
                <span>{stat.subtext}</span>
                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Live Lesson Alert & Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Classrooms & Ongoing Live Session */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ongoing Lesson Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <h3 className="font-semibold text-sm text-white">Live Classroom Now in Session</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                SOD-401
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-100">
                  WebRTC Peer Connections & Video Stages
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Instructor: <strong>Eric Manzi</strong> • 7 students connected
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-mono">
                  <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Passcode: LIVE77</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Rules Accepted
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('live-classroom')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Video className="w-4 h-4" />
                <span>Enter Room</span>
              </button>
            </div>
          </div>

          {/* Practical Projects Quick Access */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm text-white">Your Practical Projects</h3>
              </div>
              <button
                onClick={() => onNavigate('coding-ide')}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => onNavigate('coding-ide')}
                className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-xs text-slate-200">Interactive School Portal & Attendance Dashboard</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">HTML / CSS / JS • Submitted (Grade: 96/100)</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                  Reviewed
                </span>
              </div>

              <div
                onClick={() => onNavigate('coding-ide')}
                className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-xs text-slate-200">Algorithms: Binary Search & Graph Traversal</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Python 3.12 • Reviewed (Grade: 100/100)</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 font-semibold">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Classroom Roster (Online / Offline Presence) & Announcements */}
        <div className="space-y-6">
          {/* Active / Inactive Roster */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-sm text-white">Classroom Presence</h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400">
                {classmates.filter(c => c.online).length} Active
              </span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {classmates.map((person, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                        {person.name[0]}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 ${
                          person.online ? 'bg-emerald-400' : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-200 truncate">{person.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{person.activeTask}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      person.online
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}
                  >
                    {person.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm text-white">School Notice</h3>
              </div>
              <span className="text-[11px] text-blue-400">Latest</span>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-slate-100">National Software Engineering Hackathon 2026</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Registration open for Senior 5 & 6 SOD students. Submissions will be evaluated by national tech mentors.
              </p>
              <div className="text-[10px] text-slate-500 pt-1">Published by Claire Uwase • Dean of Studies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
