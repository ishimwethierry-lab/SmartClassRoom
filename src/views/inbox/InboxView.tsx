import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { ChatMessage } from '../../types';
import {
  Mail,
  Send,
  Paperclip,
  Search,
  CheckCheck,
  User,
  School,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';

interface InboxViewProps {
  currentLang: Language;
}

export const InboxView: React.FC<InboxViewProps> = ({ currentLang }) => {
  const { user, role } = useAuth();

  const [activeChannel, setActiveChannel] = useState<'teacher' | 'mentor' | 'office'>('teacher');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_01',
      conversationId: 'teacher',
      senderId: 'usr_teacher_1',
      senderName: 'Eric Manzi',
      senderRole: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'Good morning Thierry. Excellent work on the WebRTC data channel test. Remember to complete the quiz before Friday.',
      timestamp: 'Today at 07:45 AM'
    },
    {
      id: 'msg_02',
      conversationId: 'teacher',
      senderId: 'usr_student_1',
      senderName: 'Thierry Ishimwe',
      senderRole: 'student',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: 'Thank you Teacher Eric! I completed the quiz and scored 28/30. I am now finalizing the offline sync project in the Coding IDE.',
      timestamp: 'Today at 08:12 AM'
    },
    {
      id: 'msg_03',
      conversationId: 'teacher',
      senderId: 'usr_teacher_1',
      senderName: 'Eric Manzi',
      senderRole: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'Great initiative! Make sure to test your IndexedDB sync queue when disconnecting your WiFi network to confirm zero data loss.',
      timestamp: 'Today at 08:30 AM',
      attachment: {
        name: 'webrtc-handshake-diagram.pdf',
        url: '#',
        type: 'PDF Document',
        size: '1.4 MB'
      }
    }
  ]);

  const [inputText, setInputText] = useState('');

  const channels = [
    {
      id: 'teacher',
      name: 'Eric Manzi (Teacher)',
      role: 'Lead Software Faculty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      lastMsg: 'Great initiative! Make sure to test your IndexedDB...',
      time: '08:30 AM',
      unread: 1
    },
    {
      id: 'mentor',
      name: 'Divine Mutoni (Mentor)',
      role: 'Peer Student Mentor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      lastMsg: 'Do you want to review the Dijkstra graph traversal tonight?',
      time: 'Yesterday',
      unread: 1
    },
    {
      id: 'office',
      name: 'Academic Affairs Office',
      role: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      lastMsg: 'Your Term 1 enrollment verification has been stamped.',
      time: 'Oct 19',
      unread: 0
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: activeChannel,
      senderId: user?.id || 'usr_student_1',
      senderName: `${user?.firstName} ${user?.lastName}`,
      senderRole: user?.role || 'student',
      senderAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const currentChannel = channels.find(c => c.id === activeChannel) || channels[0];

  return (
    <div className="h-[calc(100vh-5.5rem)] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-white flex flex-col md:flex-row shadow-2xl">
      {/* Channels List */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-sm text-white">Inbox & Messages</h2>
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">
            2 Unread
          </span>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800/80">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
          {channels.map((chan) => (
            <div
              key={chan.id}
              onClick={() => setActiveChannel(chan.id as any)}
              className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                activeChannel === chan.id
                  ? 'bg-blue-600/20 border-l-4 border-blue-500'
                  : 'hover:bg-slate-850'
              }`}
            >
              <img
                src={chan.avatar}
                alt={chan.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate">{chan.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{chan.time}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{chan.lastMsg}</div>
              </div>
              {chan.unread > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Conversation Stage */}
      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
        {/* Stage Header */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentChannel.avatar}
              alt={currentChannel.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div>
              <div className="font-bold text-xs text-white">{currentChannel.name}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Active • School Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.senderId === user?.id || msg.senderRole === user?.role;
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div
                  className={`p-3.5 rounded-2xl text-xs space-y-1.5 ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="leading-relaxed">{msg.text}</p>

                  {/* Attachment Pill if present */}
                  {msg.attachment && (
                    <div className="p-2 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2 mt-2">
                      <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate text-[11px]">{msg.attachment.name}</div>
                        <div className="text-[9px] opacity-75">{msg.attachment.size} • {msg.attachment.type}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            title="Attach Project or File"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${currentChannel.name}...`}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
