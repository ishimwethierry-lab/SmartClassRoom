import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  School,
  ArrowRight,
  BookOpen,
  Lock
} from 'lucide-react';

interface ClassroomAccessViewProps {
  onJoinSuccess: (classroomId: string) => void;
  currentLang: Language;
}

export const ClassroomAccessView: React.FC<ClassroomAccessViewProps> = ({
  onJoinSuccess,
  currentLang
}) => {
  const { user } = useAuth();
  const t = translations[currentLang].classroom;

  const [selectedClassId, setSelectedClassId] = useState('cls_sod_401');
  const [passcode, setPasscode] = useState('');
  const [passcodeType, setPasscodeType] = useState<'enrollment' | 'live' | 'quiz'>('live');
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const classrooms = [
    {
      id: 'cls_sod_401',
      name: 'Senior 5: Web Architecture & React Applications',
      code: 'SOD-401',
      teacher: 'Eric Manzi',
      activePasscode: 'CLASS2026',
      livePasscode: 'LIVE77',
      quizPasscode: 'QUIZ401',
      rulesVersion: 'v2.1',
      rules: [
        'Turn on video during teacher demonstrations when connectivity permits.',
        'Mute your microphone upon joining until the open Q&A phase.',
        'Use the in-class chat exclusively for academic inquiry and code debugging snippets.',
        'Never share classroom access passcodes or quiz keys with un-enrolled students.',
        'Submit independent coding work. Plagiarism is strictly monitored by the code review engine.'
      ]
    },
    {
      id: 'cls_sod_502',
      name: 'Senior 5: Backend API Engineering & Python Runtimes',
      code: 'SOD-502',
      teacher: 'Eric Manzi',
      activePasscode: 'BACKEND99',
      livePasscode: 'LIVE502',
      quizPasscode: 'SQL2026',
      rulesVersion: 'v1.4',
      rules: [
        'Run and test unit tests before committing code to the classroom repository.',
        'Ensure database transactions follow ACID compliance standards.',
        'Respect intellectual property for all open source libraries used.'
      ]
    }
  ];

  const currentClass = classrooms.find(c => c.id === selectedClassId) || classrooms[0];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsVerifying(false);
      const inputCode = passcode.trim().toUpperCase();

      let targetPasscode = currentClass.livePasscode;
      if (passcodeType === 'enrollment') targetPasscode = currentClass.activePasscode;
      if (passcodeType === 'quiz') targetPasscode = currentClass.quizPasscode;

      if (inputCode === targetPasscode) {
        if (!acceptedRules) {
          setStatusMessage({
            type: 'error',
            text: 'Passcode verified, but you must accept the Classroom Rules and Academic Integrity code below.'
          });
          return;
        }

        setStatusMessage({
          type: 'success',
          text: `Passcode confirmed! Authorization granted for ${currentClass.name}. Entering classroom...`
        });

        setTimeout(() => {
          onJoinSuccess(currentClass.id);
        }, 800);
      } else {
        setStatusMessage({
          type: 'error',
          text: `Invalid passcode for ${passcodeType.toUpperCase()} access. Hint: For demo use "${targetPasscode}".`
        });
      }
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
          <KeyRound className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Classroom Access Gate</h1>
        <p className="text-xs text-slate-400">
          Secure passcode verification and academic rules agreement for SmartClass Dev students.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Step 1: Classroom & Access Scope */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            1. Select Target Classroom
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classrooms.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedClassId(c.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedClassId === c.id
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs">{c.name}</div>
                <div className="text-[11px] text-slate-400 mt-1">Code: {c.code} • Teacher: {c.teacher}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Access Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            2. Passcode Type
          </label>
          <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-semibold gap-1">
            <button
              type="button"
              onClick={() => setPasscodeType('live')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                passcodeType === 'live' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Lesson (Code: {currentClass.livePasscode})
            </button>
            <button
              type="button"
              onClick={() => setPasscodeType('enrollment')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                passcodeType === 'enrollment' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Enrollment (Code: {currentClass.activePasscode})
            </button>
            <button
              type="button"
              onClick={() => setPasscodeType('quiz')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                passcodeType === 'quiz' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Quiz (Code: {currentClass.quizPasscode})
            </button>
          </div>
        </div>

        {/* Step 3: Passcode Input */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              3. Enter Passcode
            </label>
            <div className="relative">
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter your passcode..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-base text-white font-mono tracking-widest uppercase focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => {
                  if (passcodeType === 'live') setPasscode(currentClass.livePasscode);
                  if (passcodeType === 'enrollment') setPasscode(currentClass.activePasscode);
                  if (passcodeType === 'quiz') setPasscode(currentClass.quizPasscode);
                }}
                className="absolute right-3 top-2.5 text-[11px] px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-blue-300 font-sans"
              >
                Auto-Fill
              </button>
            </div>
          </div>

          {/* 6.5 Classroom Rules Board */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Classroom Rules & Integrity Board ({currentClass.rulesVersion})</span>
              </div>
              <span className="text-[10px] text-slate-500">Required Acceptance</span>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {currentClass.rules.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">{rule}</li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-200">
                <input
                  type="checkbox"
                  checked={acceptedRules}
                  onChange={(e) => setAcceptedRules(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700 focus:ring-blue-500"
                />
                <span>I have read and agree to follow all classroom rules and academic ethics</span>
              </label>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                  : 'bg-rose-950 border border-rose-800 text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            {isVerifying ? (
              <span>Verifying Passcode...</span>
            ) : (
              <>
                <span>Accept & Open Classroom</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
