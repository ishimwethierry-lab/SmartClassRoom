import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { Quiz, QuizSubmission } from '../../types';
import {
  HelpCircle,
  Clock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface QuizTakingViewProps {
  currentLang: Language;
}

export const QuizTakingView: React.FC<QuizTakingViewProps> = ({ currentLang }) => {
  const { user } = useAuth();

  const quizzes: Quiz[] = [
    {
      id: 'quiz_webrtc_01',
      classroomId: 'cls_sod_401',
      classroomName: 'Senior 5: Web Architecture & React Applications',
      title: 'WebRTC Signaling & SDP Handshake Assessment',
      subject: 'Frontend Engineering',
      passcode: 'QUIZ401',
      timeLimitMinutes: 15,
      totalPoints: 30,
      isPublished: true,
      dueDate: '2026-10-28T23:59:59Z',
      highestScore: 28,
      completed: true,
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'What protocol does WebRTC use to discover public IP addresses and navigate symmetric/asymmetric NAT routers?',
          options: ['STUN / TURN', 'FTP Passive Mode', 'DNS Over HTTPS', 'NTP Protocol'],
          correctAnswer: 'STUN / TURN',
          points: 10,
          explanation: 'STUN (Session Traversal Utilities for NAT) discovers public mappings, while TURN acts as a media relay when direct P2P is blocked.'
        },
        {
          id: 'q2',
          type: 'true_false',
          prompt: 'Does the browser require an external signaling server (such as WebSocket) to exchange Session Description Protocol (SDP) offers and ICE candidates before establishing a direct peer media stream?',
          options: ['True', 'False'],
          correctAnswer: 'True',
          points: 10,
          explanation: 'WebRTC does not standardize signaling; applications must use WebSocket or HTTP to exchange initial SDP offers and ICE candidates.'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          prompt: 'Which HTML5 attribute must be applied to an iframe executing untrusted student code to block access to the parent DOM and cookies?',
          options: ['sandbox="allow-scripts"', 'contenteditable="false"', 'rel="noopener"', 'referrerpolicy="origin"'],
          correctAnswer: 'sandbox="allow-scripts"',
          points: 10,
          explanation: 'sandbox without allow-same-origin ensures the iframe executes in a unique null origin, isolating it from parent session cookies.'
        }
      ]
    },
    {
      id: 'quiz_sql_02',
      classroomId: 'cls_sod_502',
      classroomName: 'Senior 5: Backend API Engineering',
      title: 'Relational Database Integrity & SQL Transactions',
      subject: 'Backend Architecture',
      passcode: 'SQL2026',
      timeLimitMinutes: 20,
      totalPoints: 20,
      isPublished: true,
      dueDate: '2026-11-02T23:59:59Z',
      highestScore: 0,
      completed: false,
      questions: [
        {
          id: 'sq1',
          type: 'multiple_choice',
          prompt: 'Which property in ACID guarantees that all operations within a database transaction succeed or all roll back completely?',
          options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
          correctAnswer: 'Atomicity',
          points: 10,
          explanation: 'Atomicity guarantees all-or-nothing completion.'
        },
        {
          id: 'sq2',
          type: 'true_false',
          prompt: 'Foreign key constraints in MySQL InnoDB engine prevent orphan records from violating relational referential integrity.',
          options: ['True', 'False'],
          correctAnswer: 'True',
          points: 10,
          explanation: 'Foreign keys enforce parent-child relational integrity constraints.'
        }
      ]
    }
  ];

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(quizzes[0]);
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Active quiz attempt state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({
    q1: 'STUN / TURN',
    q2: 'True',
    q3: 'sandbox="allow-scripts"'
  });
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [submissionResult, setSubmissionResult] = useState<QuizSubmission | null>({
    id: 'sub_001',
    quizId: 'quiz_webrtc_01',
    userId: 'usr_student_1',
    userName: 'Thierry Ishimwe',
    score: 30,
    totalPoints: 30,
    percentage: 100,
    completedAt: '2026-10-18T16:22:00Z',
    answers: {
      q1: 'STUN / TURN',
      q2: 'True',
      q3: 'sandbox="allow-scripts"'
    }
  });

  // Handle Passcode Unlock
  const handleUnlockQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuiz) return;

    if (passcode.trim().toUpperCase() === selectedQuiz.passcode) {
      setIsUnlocked(true);
      setPasscodeError(null);
      setSubmissionResult(null);
      setUserAnswers({});
      setTimeLeft(selectedQuiz.timeLimitMinutes * 60);
    } else {
      setPasscodeError(`Invalid passcode. Hint: For demo use "${selectedQuiz.passcode}".`);
    }
  };

  // Submit and Auto-Grade
  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;

    let score = 0;
    for (const q of selectedQuiz.questions) {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += q.points;
      }
    }

    const percentage = Math.round((score / selectedQuiz.totalPoints) * 100);
    const result: QuizSubmission = {
      id: `sub_${Date.now()}`,
      quizId: selectedQuiz.id,
      userId: user?.id || 'usr_student_1',
      userName: `${user?.firstName} ${user?.lastName}`,
      score,
      totalPoints: selectedQuiz.totalPoints,
      percentage,
      completedAt: new Date().toISOString(),
      answers: userAnswers
    };

    setSubmissionResult(result);

    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            <span>Passcode-Protected Quizzes & Assessments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test your programming, architectural, and algorithmic skills with instant server auto-evaluation.
          </p>
        </div>
      </div>

      {/* Available Quiz Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quizzes.map((q) => (
          <div
            key={q.id}
            onClick={() => {
              setSelectedQuiz(q);
              setIsUnlocked(false);
              setPasscode('');
              setSubmissionResult(null);
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedQuiz?.id === q.id
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                {q.subject}
              </span>
              <span className="text-xs font-semibold text-emerald-400">{q.totalPoints} Points</span>
            </div>
            <h3 className="font-bold text-sm text-white">{q.title}</h3>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Time: {q.timeLimitMinutes} mins</span>
              <span className="text-slate-500">Passcode Required</span>
            </div>
          </div>
        ))}
      </div>

      {/* Passcode Lock Gate if not unlocked */}
      {!isUnlocked && selectedQuiz && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-md mx-auto shadow-xl space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <KeyRound className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Enter Quiz Access Passcode</h3>
            <p className="text-xs text-slate-400 mt-1">
              Teacher Eric provided this code during the live classroom session for <strong>{selectedQuiz.title}</strong>.
            </p>
          </div>

          <form onSubmit={handleUnlockQuiz} className="space-y-3">
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="e.g. QUIZ401 or SQL2026"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-sm font-mono tracking-widest uppercase text-white focus:outline-none focus:border-blue-500"
              required
            />

            {passcodeError && (
              <p className="text-xs text-rose-400">{passcodeError}</p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPasscode(selectedQuiz.passcode)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-400"
              >
                Auto-Fill Code ({selectedQuiz.passcode})
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-600/30"
              >
                Unlock Quiz
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Quiz Taking Workspace */}
      {isUnlocked && selectedQuiz && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          {/* Header with Timer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400">{selectedQuiz.classroomName}</span>
              <h2 className="text-lg font-bold text-white">{selectedQuiz.title}</h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-mono text-xs text-amber-300">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Time: 14:32</span>
            </div>
          </div>

          {/* Submission Result Score Card */}
          {submissionResult && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Award className="w-5 h-5" />
                  <span>Assessment Score: {submissionResult.score} / {submissionResult.totalPoints} ({submissionResult.percentage}%)</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-900 text-emerald-300 font-bold border border-emerald-700">
                  {submissionResult.percentage >= 80 ? 'Distinction Pass' : 'Passed'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Logged to student transcript. This score contributes to your official <strong>Course Certificate eligibility</strong>.
              </p>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {selectedQuiz.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">Question {idx + 1} of {selectedQuiz.questions.length}</span>
                  <span className="text-xs font-mono text-slate-400">{q.points} Points</span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                  {q.prompt}
                </p>

                {/* Options */}
                <div className="space-y-2 pt-1">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === opt;
                    const isCorrect = q.correctAnswer === opt;
                    const showFeedback = !!submissionResult;

                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850';
                    if (isSelected) optionStyle = 'bg-blue-600/30 border-blue-500 text-white font-semibold';
                    if (showFeedback && isCorrect) optionStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-semibold';

                    return (
                      <div
                        key={optIdx}
                        onClick={() => {
                          if (!submissionResult) {
                            setUserAnswers(prev => ({ ...prev, [q.id]: opt }));
                          }
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Question Explanation if graded */}
                {submissionResult && q.explanation && (
                  <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-emerald-400">Teacher Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setSubmissionResult(null);
                setUserAnswers({});
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Answers</span>
            </button>

            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              Submit Assessment for Grading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
