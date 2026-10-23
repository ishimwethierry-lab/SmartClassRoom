import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { LiveSession, LiveParticipant } from '../../types';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  Users,
  MessageSquare,
  Maximize2,
  Minimize2,
  CircleDot,
  LogOut,
  Send,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface LiveClassroomViewProps {
  onLeave: () => void;
  currentLang: Language;
}

export const LiveClassroomView: React.FC<LiveClassroomViewProps> = ({
  onLeave,
  currentLang
}) => {
  const { user, role } = useAuth();
  const t = translations[currentLang].classroom;

  // Session state
  const [session, setSession] = useState<LiveSession>({
    id: 'sess_live_101',
    classroomId: 'cls_sod_401',
    classroomName: 'Senior 5: Web Architecture & React Applications',
    lessonTitle: 'Module 4: WebRTC Peer Connections & Video Stages',
    subject: 'Web Technologies',
    status: 'live',
    startedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    teacherId: 'usr_teacher_1',
    teacherName: 'Eric Manzi',
    passcode: 'LIVE77',
    recordingActive: true,
    participants: [
      {
        id: 'p_teacher',
        userId: 'usr_teacher_1',
        name: 'Eric Manzi (Teacher)',
        role: 'teacher',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isMuted: false,
        isVideoOff: false,
        isScreenSharing: true,
        isHandRaised: false,
        isTeacher: true,
        joinedAt: new Date(Date.now() - 26 * 60 * 1000).toISOString()
      },
      {
        id: 'p_student_me',
        userId: user?.id || 'usr_student_1',
        name: `${user?.firstName || 'Thierry'} ${user?.lastName || 'Ishimwe'} (You)`,
        role: user?.role || 'student',
        avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isTeacher: user?.role === 'teacher',
        joinedAt: new Date(Date.now() - 24 * 60 * 1000).toISOString()
      },
      {
        id: 'p_st_2',
        userId: 'usr_st_2',
        name: 'Aline Umutoni',
        role: 'student',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: true,
        isTeacher: false,
        joinedAt: new Date(Date.now() - 23 * 60 * 1000).toISOString()
      },
      {
        id: 'p_st_3',
        userId: 'usr_st_3',
        name: 'Jean de Dieu Habimana',
        role: 'student',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isTeacher: false,
        joinedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
      },
      {
        id: 'p_st_4',
        userId: 'usr_st_4',
        name: 'Divine Mutoni (Mentor)',
        role: 'mentor',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isTeacher: false,
        joinedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString()
      },
      {
        id: 'p_st_5',
        userId: 'usr_st_5',
        name: 'Kevine Uwera',
        role: 'student',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isTeacher: false,
        joinedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString()
      },
      {
        id: 'p_st_6',
        userId: 'usr_st_6',
        name: 'Cedric Mugisha',
        role: 'student',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
        isMuted: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isTeacher: false,
        joinedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ]
  });

  // Local Media Stream state
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [activeSideDrawer, setActiveSideDrawer] = useState<'none' | 'chat' | 'participants'>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Chat in classroom
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isTeacher?: boolean }>>([
    { sender: 'Eric Manzi (Teacher)', text: 'Welcome everyone! Today we examine the WebRTC SDP handshake and stun/turn routing.', time: '10:02', isTeacher: true },
    { sender: 'Aline Umutoni', text: 'Teacher Eric, what is the best strategy when TURN bandwidth is restricted?', time: '10:14' },
    { sender: 'Divine Mutoni (Mentor)', text: 'Aline, we throttle the video bitrate and prioritize the Opus audio stream first.', time: '10:16' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Local camera stream reference
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Attempt real webcam access if user permits, otherwise fallback gracefully
  useEffect(() => {
    let active = true;
    async function startCamera() {
      try {
        if (!isVideoOff && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (active && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localStreamRef.current = stream;
          }
        }
      } catch (err) {
        // User denied or in iframe with restricted permissions - simulated feed is active
        console.info('Using simulated participant stream for video feed');
      }
    }
    startCamera();

    return () => {
      active = false;
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [isVideoOff]);

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing && navigator.mediaDevices?.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setIsScreenSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      } else {
        setIsScreenSharing(false);
      }
    } catch {
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: `${user?.firstName} (${role === 'teacher' ? 'Teacher' : 'Student'})`,
        text: newChatText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacher: role === 'teacher'
      }
    ]);
    setNewChatText('');
  };

  const confirmLeave = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
    }
    setShowLeaveModal(false);
    onLeave();
  };

  const teacher = session.participants.find(p => p.isTeacher) || session.participants[0];
  const students = session.participants.filter(p => !p.isTeacher);

  return (
    <div className={`relative flex flex-col bg-slate-950 text-white select-none ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-5.5rem)] rounded-2xl overflow-hidden border border-slate-800'}`}>
      {/* 8.1 Header */}
      <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>LIVE</span>
          </div>
          <div>
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>{session.classroomName}</span>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                SOD-401
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate hidden sm:block">
              {session.lessonTitle} • Host: <strong>{session.teacherName}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Recording Badge */}
          {isRecording && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/60 border border-rose-800 px-2.5 py-1 rounded-full font-mono">
              <CircleDot className="w-3.5 h-3.5 animate-pulse text-rose-500" />
              <span>REC 00:25:40</span>
            </div>
          )}

          {/* Participant count */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{session.participants.length} Active</span>
          </div>

          {/* Connection quality */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>HD • 32ms</span>
          </div>
        </div>
      </div>

      {/* 8.1 Main Stage Area matching the sketch layout! */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 p-3 flex flex-col lg:flex-row gap-3 overflow-hidden">
          {/* Top/Side Student Tiles Ring */}
          <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:w-48 shrink-0 pb-1 custom-scrollbar">
            {students.slice(0, 3).map((student) => (
              <div
                key={student.id}
                className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 w-36 h-24 lg:w-full lg:h-32 shrink-0 group shadow-md"
              >
                {/* Video simulator or local feed */}
                {student.userId === user?.id && !isVideoOff ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
                    />
                  </div>
                )}

                {/* Hand raised indicator */}
                {student.isHandRaised && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-lg animate-bounce">
                    <Hand className="w-3 h-3" />
                  </div>
                )}

                {/* Name & audio status pill */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                  <span className="truncate max-w-[80px] font-medium">{student.name}</span>
                  {student.isMuted ? (
                    <MicOff className="w-2.5 h-2.5 text-rose-400" />
                  ) : (
                    <Mic className="w-2.5 h-2.5 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Large Central Teacher / Shared Presentation Area (The focal point from the sketch!) */}
          <div className="order-1 lg:order-2 flex-1 relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-blue-500/40 shadow-2xl flex flex-col">
            {/* Spotlight Banner */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white font-bold text-xs tracking-wide uppercase flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Teacher Stage • {teacher.name}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono">
                Screen Share Active
              </span>
            </div>

            {/* Simulated Live Teacher Screen / Presentation */}
            <div className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              {/* Background blueprint graphic */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-xl space-y-4">
                <div className="inline-block p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 mb-2">
                  <MonitorUp className="w-10 h-10 mx-auto" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  WebRTC Media Architecture & SDP Signaling
                </h2>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono text-xs text-blue-300 shadow-inner overflow-x-auto">
                  <div className="text-slate-500">// Peer Connection Protocol State</div>
                  <div>const pc = new RTCPeerConnection(rtcConfiguration);</div>
                  <div>pc.onicecandidate = (event) =&gt; signaling.send(event.candidate);</div>
                  <div>pc.ontrack = (event) =&gt; remoteVideo.srcObject = event.streams[0];</div>
                  <div className="text-emerald-400 mt-1">// Status: Connection established (Direct P2P, Latency 32ms)</div>
                </div>
                <p className="text-xs text-slate-400">
                  Eric Manzi is demonstrating peer exchange and active screen broadcasting. Click "Raise Hand" to ask a question.
                </p>
              </div>

              {/* Picture-in-picture Teacher Camera Tile */}
              <div className="absolute bottom-4 right-4 w-32 h-24 rounded-xl overflow-hidden border-2 border-blue-400 shadow-2xl bg-slate-800 z-20">
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-[9px] px-1 rounded bg-black/70">
                  <span className="truncate font-semibold">{teacher.name}</span>
                  <Mic className="w-2.5 h-2.5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom/Right Student Tiles Ring */}
          <div className="order-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:w-48 shrink-0 pb-1 custom-scrollbar">
            {students.slice(3).map((student) => (
              <div
                key={student.id}
                className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 w-36 h-24 lg:w-full lg:h-32 shrink-0 group shadow-md"
              >
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
                  />
                </div>

                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                  <span className="truncate max-w-[80px] font-medium">{student.name}</span>
                  {student.isMuted ? (
                    <MicOff className="w-2.5 h-2.5 text-rose-400" />
                  ) : (
                    <Mic className="w-2.5 h-2.5 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Drawer: Chat or Participants */}
        {activeSideDrawer !== 'none' && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 z-30 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">
                {activeSideDrawer === 'chat' ? 'Classroom Chat' : 'Participants'}
              </span>
              <button
                onClick={() => setActiveSideDrawer('none')}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Content */}
            {activeSideDrawer === 'chat' ? (
              <div className="flex-1 flex flex-col p-3 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs custom-scrollbar">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl ${
                        msg.isTeacher
                          ? 'bg-blue-950/60 border border-blue-800/80 text-blue-100'
                          : 'bg-slate-800/70 border border-slate-700/50 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-slate-300">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    placeholder="Type in classroom chat..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Participants List */
              <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
                {session.participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.avatarUrl} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-slate-200 text-xs">{p.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase">{p.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      {p.isMuted ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 8.1 Bottom Control Bar */}
      <div className="h-16 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between shrink-0">
        {/* Left: Audio & Video controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
              isMuted
                ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={isMuted ? t.unmute : t.mute}
          >
            {isMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
              isVideoOff
                ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={isVideoOff ? t.cameraOn : t.cameraOff}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4 text-rose-400" /> : <Video className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline">{isVideoOff ? 'Camera Off' : 'Camera On'}</span>
          </button>
        </div>

        {/* Center: Interactive Class Controls */}
        <div className="flex items-center gap-2">
          {/* Share Screen */}
          <button
            onClick={toggleScreenShare}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
              isScreenSharing
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={t.shareScreen}
          >
            <MonitorUp className="w-4 h-4" />
            <span className="hidden md:inline">{isScreenSharing ? 'Sharing' : 'Share'}</span>
          </button>

          {/* Raise Hand */}
          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
              isHandRaised
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={t.handRaise}
          >
            <Hand className="w-4 h-4" />
            <span className="hidden md:inline">{isHandRaised ? 'Hand Raised' : 'Raise Hand'}</span>
          </button>

          {/* Participants Drawer Toggle */}
          <button
            onClick={() => setActiveSideDrawer(activeSideDrawer === 'participants' ? 'none' : 'participants')}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-all ${
              activeSideDrawer === 'participants'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={t.participants}
          >
            <Users className="w-4 h-4" />
            <span className="hidden lg:inline">{session.participants.length}</span>
          </button>

          {/* Chat Drawer Toggle */}
          <button
            onClick={() => setActiveSideDrawer(activeSideDrawer === 'chat' ? 'none' : 'chat')}
            className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-all ${
              activeSideDrawer === 'chat'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={t.chat}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden lg:inline">Chat</span>
          </button>

          {/* Teacher Recording Control */}
          {role === 'teacher' && (
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 ${
                isRecording
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Record Classroom"
            >
              <CircleDot className="w-4 h-4 text-rose-500" />
              <span className="hidden lg:inline">{isRecording ? 'Stop REC' : 'Record'}</span>
            </button>
          )}
        </div>

        {/* Right: Fullscreen & Leave Classroom with confirmation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowLeaveModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>
      </div>

      {/* 8.6 Leave Lesson Confirmation Dialog Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-lg text-white">Leave Live Classroom?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your attendance duration (<strong>25 minutes</strong>) will be logged to the server. You can re-enter this session at any time with passcode <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300 font-mono">LIVE77</code>.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmLeave}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Confirm & Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
