export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'teacher'
  | 'student'
  | 'mentor'
  | 'parent';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  className: string;
  sectionTrade: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  avatarUrl: string;
  createdAt: string;
  schoolId: string;
  schoolName: string;
}

export interface Classroom {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  description: string;
  rulesVersion: string;
  rules: string[];
  passcode: string;
  hasEnrolled?: boolean;
  hasAcceptedRules?: boolean;
  memberCount: number;
}

export interface LiveParticipant {
  id: string;
  userId: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isTeacher: boolean;
  joinedAt: string;
}

export interface LiveSession {
  id: string;
  classroomId: string;
  classroomName: string;
  lessonTitle: string;
  subject: string;
  status: 'scheduled' | 'live' | 'ended';
  startedAt: string;
  teacherId: string;
  teacherName: string;
  passcode: string;
  participants: LiveParticipant[];
  recordingActive: boolean;
}

export interface ProjectFile {
  name: string;
  content: string;
  language: string;
}

export interface CodeProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  language: 'html' | 'javascript' | 'typescript' | 'python' | 'cpp' | 'sql' | 'react';
  files: Record<string, string>;
  activeFile: string;
  createdAt: string;
  updatedAt: string;
  isSynced: boolean;
  submissionStatus?: 'none' | 'submitted' | 'reviewed';
  feedback?: string;
  grade?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'code';
  prompt: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  classroomId: string;
  classroomName: string;
  title: string;
  subject: string;
  passcode: string;
  timeLimitMinutes: number;
  totalPoints: number;
  questions: QuizQuestion[];
  isPublished: boolean;
  dueDate: string;
  highestScore?: number;
  completed?: boolean;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
  answers: Record<string, string | number>;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  description: string;
  summary: string;
  tags: string[];
  coverGradient: string;
  isDownloadedOffline?: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  lessonTitle: string;
  classroomId: string;
  classroomName: string;
  userId: string;
  studentName: string;
  studentClass: string;
  joinedAt: string;
  leftAt?: string;
  durationMinutes: number;
  status: 'present' | 'late' | 'absent';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    url: string;
    type: string;
    size: string;
  };
}

export interface Certificate {
  id: string;
  code: string;
  studentName: string;
  studentId: string;
  courseTitle: string;
  issueDate: string;
  issuerName: string;
  issuerOrg: string;
  grade: string;
  verificationHash: string;
  isValid: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  date: string;
  scope: 'school' | 'classroom';
  targetName: string;
}
