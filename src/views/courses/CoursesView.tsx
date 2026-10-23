import React from 'react';
import { translations, Language } from '../../lib/i18n';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  Database,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

interface CoursesViewProps {
  onNavigate: (view: string) => void;
  currentLang: Language;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onNavigate, currentLang }) => {
  const courses = [
    {
      id: 'c1',
      code: 'SOD-401',
      title: 'Web Architecture & React Applications',
      teacher: 'Eric Manzi',
      modules: 12,
      completedModules: 9,
      progress: 75,
      icon: Code2,
      color: 'from-blue-600 to-indigo-600',
      description: 'Component lifecycles, WebRTC peer connections, reactive state management, and Vite development.'
    },
    {
      id: 'c2',
      code: 'SOD-502',
      title: 'Backend API Engineering & Python Runtimes',
      teacher: 'Eric Manzi',
      modules: 10,
      completedModules: 8,
      progress: 80,
      icon: Terminal,
      color: 'from-emerald-600 to-teal-600',
      description: 'REST architecture, asynchronous task workers, Argon2 password security, and microservices.'
    },
    {
      id: 'c3',
      code: 'SOD-403',
      title: 'Database Architecture & MySQL Optimization',
      teacher: 'Claude Habineza',
      modules: 8,
      completedModules: 7,
      progress: 88,
      icon: Database,
      color: 'from-purple-600 to-violet-600',
      description: 'Relational 3NF normalization, foreign key constraints, B-Tree indexes, and ACID transactions.'
    },
    {
      id: 'c4',
      code: 'SOD-601',
      title: 'Systems Programming in C & Memory Safety',
      teacher: 'Eugene Mutabazi',
      modules: 14,
      completedModules: 8,
      progress: 57,
      icon: Cpu,
      color: 'from-rose-600 to-red-600',
      description: 'Pointers, heap dynamic memory, POSIX threads, Valgrind leak analysis, and virtual paging.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <span>Enrolled Subjects & Curriculum Modules</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Rwanda TVET Senior 5 Software Development curriculum courses and syllabus tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {course.code}
                  </span>
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${course.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-bold text-base text-white">{course.title}</h3>
                <div className="text-xs text-slate-400 mt-1">Faculty: {course.teacher}</div>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{course.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Curriculum Progress</span>
                  <span className="font-bold text-blue-400">{course.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    {course.completedModules} of {course.modules} Units Complete
                  </span>
                  <button
                    onClick={() => onNavigate('coding-ide')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Open Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
