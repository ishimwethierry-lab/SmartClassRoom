import React, { useState } from 'react';
import { translations, Language } from '../../lib/i18n';
import {
  Film,
  Play,
  Download,
  Clock,
  Calendar,
  Lock,
  CheckCircle2,
  X
} from 'lucide-react';

interface RecordingsViewProps {
  currentLang: Language;
}

export const RecordingsView: React.FC<RecordingsViewProps> = ({ currentLang }) => {
  const [activePlayback, setActivePlayback] = useState<any | null>(null);

  const recordings = [
    {
      id: 'rec_01',
      title: 'Module 3: REST API Security, Argon2 & JWT Lifecycle',
      classroom: 'SOD-401 Web Architecture',
      instructor: 'Eric Manzi',
      date: 'October 19, 2026',
      duration: '1h 28m',
      fileSize: '410 MB',
      description: 'Full lecture covering password salting, Argon2id parameters, bearer authorization tokens, and CSRF mitigation in Express applications.'
    },
    {
      id: 'rec_02',
      title: 'Module 2: TypeScript Generics, Utility Types & Type Guards',
      classroom: 'SOD-401 Web Architecture',
      instructor: 'Eric Manzi',
      date: 'October 17, 2026',
      duration: '1h 15m',
      fileSize: '350 MB',
      description: 'Hands-on live coding with TypeScript discriminated unions, Record, Pick, Omit, and custom type narrowing functions.'
    },
    {
      id: 'rec_03',
      title: 'Module 1: Client State Management & Offline IndexedDB Caches',
      classroom: 'SOD-401 Web Architecture',
      instructor: 'Eric Manzi',
      date: 'October 14, 2026',
      duration: '1h 32m',
      fileSize: '435 MB',
      description: 'Building offline-first web apps with Service Workers, CacheStorage API, and browser IndexedDB transactions.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-rose-400" />
          <span>Recorded Live Classroom Lessons</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review previous lectures, code walkthroughs, and teacher demonstrations at your own pace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recordings.map((rec) => (
          <div
            key={rec.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-slate-700 transition-all"
          >
            <div>
              {/* Video Thumbnail Graphic */}
              <div
                onClick={() => setActivePlayback(rec)}
                className="h-40 bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950/40 p-4 flex flex-col justify-between relative cursor-pointer group-hover:brightness-110 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-200 backdrop-blur-xs">
                    {rec.classroom}
                  </span>
                  <span className="text-[10px] font-mono bg-rose-600/80 text-white px-2 py-0.5 rounded font-bold">
                    HD
                  </span>
                </div>

                <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                  <span>{rec.duration}</span>
                  <span>{rec.fileSize}</span>
                </div>
              </div>

              {/* Recording Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-white line-clamp-1">{rec.title}</h3>
                <div className="text-[11px] text-slate-400">
                  Instructor: <strong>{rec.instructor}</strong> • {rec.date}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <button
                onClick={() => setActivePlayback(rec)}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Lecture</span>
              </button>
              <button
                onClick={() => alert(`Initiating secure local download of ${rec.title}...`)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Download for offline viewing"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activePlayback && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">{activePlayback.title}</h3>
                <div className="text-[11px] text-slate-400">{activePlayback.classroom} • {activePlayback.instructor}</div>
              </div>
              <button
                onClick={() => setActivePlayback(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Player Stage */}
            <div className="h-80 bg-black flex flex-col items-center justify-center relative p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-600/80 text-white flex items-center justify-center shadow-2xl animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div>
                <div className="text-white font-bold text-base">Archived Classroom Stream Active</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">00:14:22 / {activePlayback.duration}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted playback stream via SmartClass CDN</span>
              <button
                onClick={() => setActivePlayback(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
