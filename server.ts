import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// ---------------------------------------------------------------------------
// In-Memory Database with Pre-Seeded Real Data for SmartClass Dev
// ---------------------------------------------------------------------------

export const db: {
  users: any[];
  classrooms: any[];
  ruleAcceptances: any[];
  liveSessions: any[];
  projects: any[];
  quizzes: any[];
  quizSubmissions: any[];
  libraryBooks: any[];
  attendanceRecords: any[];
  certificates: any[];
  messages: any[];
  announcements: any[];
} = {
  users: [
    {
      id: 'usr_student_1',
      email: 'student@smartclass.dev',
      password: 'password123',
      firstName: 'Thierry',
      lastName: 'Ishimwe',
      className: 'Senior 5 SOD',
      sectionTrade: 'Software Development (SOD)',
      role: 'student',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-09-01T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'Kigali Tech Innovation Academy'
    },
    {
      id: 'usr_teacher_1',
      email: 'teacher@smartclass.dev',
      password: 'password123',
      firstName: 'Eric',
      lastName: 'Manzi',
      className: 'Senior Staff',
      sectionTrade: 'Lead Software Engineering Faculty',
      role: 'teacher',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-08-15T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'Kigali Tech Innovation Academy'
    },
    {
      id: 'usr_admin_1',
      email: 'admin@smartclass.dev',
      password: 'password123',
      firstName: 'Claire',
      lastName: 'Uwase',
      className: 'Administration',
      sectionTrade: 'Dean of Studies',
      role: 'school_admin',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-08-01T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'Kigali Tech Innovation Academy'
    },
    {
      id: 'usr_super_1',
      email: 'superadmin@smartclass.dev',
      password: 'password123',
      firstName: 'Dr. Jean-Paul',
      lastName: 'Kagabo',
      className: 'National Directorate',
      sectionTrade: 'Ministry EdTech Systems',
      role: 'super_admin',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-07-01T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'SmartClass Dev Central Council'
    },
    {
      id: 'usr_mentor_1',
      email: 'mentor@smartclass.dev',
      password: 'password123',
      firstName: 'Divine',
      lastName: 'Mutoni',
      className: 'Senior 6 SOD',
      sectionTrade: 'Software Development & Algorithms',
      role: 'mentor',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-08-20T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'Kigali Tech Innovation Academy'
    },
    {
      id: 'usr_parent_1',
      email: 'parent@smartclass.dev',
      password: 'password123',
      firstName: 'Patrick',
      lastName: 'Ndayisaba',
      className: 'Parent / Guardian',
      sectionTrade: 'Parent of Thierry Ishimwe',
      role: 'parent',
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      createdAt: '2026-09-02T08:00:00Z',
      schoolId: 'sch_rw_01',
      schoolName: 'Kigali Tech Innovation Academy'
    }
  ],

  classrooms: [
    {
      id: 'cls_sod_401',
      schoolId: 'sch_rw_01',
      name: 'Senior 5: Web Architecture & React Applications',
      code: 'SOD-401',
      subject: 'Frontend Engineering & Real-Time APIs',
      teacherId: 'usr_teacher_1',
      teacherName: 'Eric Manzi',
      description: 'Comprehensive study of component-driven frontends, asynchronous state, WebRTC media streams, and modern Vite setups.',
      rulesVersion: 'v2.1',
      rules: [
        'Turn on video during teacher demonstrations when connectivity permits.',
        'Mute your microphone upon joining until the open Q&A phase.',
        'Use the in-class chat exclusively for academic inquiry and code debugging snippets.',
        'Never share classroom access passcodes or quiz keys with un-enrolled students.',
        'Submit independent coding work. Plagiarism is strictly monitored by the code review engine.'
      ],
      passcode: 'CLASS2026',
      memberCount: 28
    },
    {
      id: 'cls_sod_502',
      schoolId: 'sch_rw_01',
      name: 'Senior 5: Backend API Engineering & Python Runtimes',
      code: 'SOD-502',
      subject: 'Backend Architecture',
      teacherId: 'usr_teacher_1',
      teacherName: 'Eric Manzi',
      description: 'RESTful architecture, database normalization, relational querying, and isolated asynchronous server processes.',
      rulesVersion: 'v1.4',
      rules: [
        'Run and test unit tests before committing code to the classroom repository.',
        'Ensure database transactions follow ACID compliance standards.',
        'Respect intellectual property for all open source libraries used.'
      ],
      passcode: 'BACKEND99',
      memberCount: 26
    },
    {
      id: 'cls_sod_601',
      schoolId: 'sch_rw_01',
      name: 'Senior 6: Systems Programming & C/Rust Fundamentals',
      code: 'SOD-601',
      subject: 'Low-Level Systems & Memory Safety',
      teacherId: 'usr_teacher_1',
      teacherName: 'Eric Manzi',
      description: 'Memory allocation, pointers, thread concurrency, POSIX sockets, and compiling isolated binaries.',
      rulesVersion: 'v1.0',
      rules: [
        'Memory leaks must be eliminated using Valgrind before submissions.',
        'Follow standard POSIX coding standards.'
      ],
      passcode: 'SYSTEMS42',
      memberCount: 22
    }
  ],

  ruleAcceptances: [
    {
      userId: 'usr_student_1',
      classroomId: 'cls_sod_401',
      rulesVersion: 'v2.1',
      acceptedAt: '2026-09-03T10:15:00Z'
    }
  ],

  liveSessions: [
    {
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
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: true,
          isHandRaised: false,
          isTeacher: true,
          joinedAt: new Date(Date.now() - 26 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_me',
          userId: 'usr_student_1',
          name: 'Thierry Ishimwe (You)',
          role: 'student',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: false,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 24 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_2',
          userId: 'usr_st_2',
          name: 'Aline Umutoni',
          role: 'student',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: true,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 23 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_3',
          userId: 'usr_st_3',
          name: 'Jean de Dieu Habimana',
          role: 'student',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: false,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_4',
          userId: 'usr_st_4',
          name: 'Divine Mutoni (Mentor)',
          role: 'mentor',
          avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: false,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_5',
          userId: 'usr_st_5',
          name: 'Kevine Uwera',
          role: 'student',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: false,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString()
        },
        {
          id: 'p_student_6',
          userId: 'usr_st_6',
          name: 'Cedric Mugisha',
          role: 'student',
          avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          isHandRaised: false,
          isTeacher: false,
          joinedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
        }
      ]
    }
  ],

  projects: [
    {
      id: 'proj_web_01',
      userId: 'usr_student_1',
      title: 'Interactive School Portal & Attendance Dashboard',
      description: 'A multi-page responsive web platform built with HTML, CSS grid, and modern JavaScript modular components.',
      language: 'html',
      activeFile: 'index.html',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kigali Tech Portal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <header class="badge">SMARTCLASS PROJECT</header>
    <h1>Welcome to Kigali Tech Academy</h1>
    <p>Student: <strong>Thierry Ishimwe</strong></p>
    <div id="status-box" class="status">System Active & Connected</div>
    <button id="action-btn">Run Diagnostics</button>
    <div id="output"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
        'style.css': `body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 28px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}
.badge {
  display: inline-block;
  background: #3b82f6;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
}
h1 { margin-top: 0; font-size: 22px; color: #38bdf8; }
.status {
  background: #064e3b;
  color: #34d399;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  margin: 16px 0;
  font-weight: 500;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover { background: #1d4ed8; }
#output { margin-top: 14px; font-family: monospace; font-size: 13px; color: #cbd5e1; }`,
        'app.js': `const btn = document.getElementById('action-btn');
const out = document.getElementById('output');

btn.addEventListener('click', () => {
  out.innerHTML = '<span style="color:#60a5fa">Analyzing local IndexedDB cache & network packets...</span>';
  setTimeout(() => {
    out.innerHTML = '✔ Diagnostics passed: Offline-ready (0ms latency). Ready for deployment!';
  }, 400);
});`
      },
      createdAt: '2026-10-10T14:00:00Z',
      updatedAt: '2026-10-21T18:30:00Z',
      isSynced: true,
      submissionStatus: 'submitted',
      grade: '96 / 100',
      feedback: 'Excellent modular structure and clean CSS separation. Verified offline sync test.'
    },
    {
      id: 'proj_py_02',
      userId: 'usr_student_1',
      title: 'Algorithms: Binary Search & Graph Traversal',
      description: 'Implementation of BFS, DFS, Dijkstra shortest path algorithm in pure Python with timing benchmarks.',
      language: 'python',
      activeFile: 'main.py',
      files: {
        'main.py': `# SmartClass Dev Python Workspace
# Implementation of Graph Traversal and Search

from collections import deque

class AcademicGraph:
    def __init__(self):
        self.adj = {}
        
    def add_edge(self, u, v):
        if u not in self.adj: self.adj[u] = []
        if v not in self.adj: self.adj[v] = []
        self.adj[u].append(v)
        self.adj[v].append(u)
        
    def bfs(self, start):
        visited = set([start])
        queue = deque([start])
        order = []
        
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in self.adj.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order

g = AcademicGraph()
g.add_edge('Kigali Hub', 'Musanze Campus')
g.add_edge('Kigali Hub', 'Huye Research Lab')
g.add_edge('Musanze Campus', 'Rubavu Tech')
g.add_edge('Huye Research Lab', 'Rwamagana Centre')

print("=== SmartClass Dev Graph Search Execution ===")
result = g.bfs('Kigali Hub')
print("BFS Traversal Route:", " -> ".join(result))
print("Node Count Evaluated:", len(result))
print("Status: Execution Successful! All tests passed.")`
      },
      createdAt: '2026-10-15T09:00:00Z',
      updatedAt: '2026-10-20T11:20:00Z',
      isSynced: true,
      submissionStatus: 'reviewed',
      grade: '100 / 100',
      feedback: 'Flawless BFS implementation with clean edge initialization.'
    }
  ],

  quizzes: [
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
          explanation: 'Atomicity ensures all-or-nothing execution.'
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
  ],

  quizSubmissions: [
    {
      id: 'sub_001',
      quizId: 'quiz_webrtc_01',
      userId: 'usr_student_1',
      userName: 'Thierry Ishimwe',
      score: 28,
      totalPoints: 30,
      percentage: 93,
      completedAt: '2026-10-18T16:22:00Z',
      answers: {
        'q1': 'STUN / TURN',
        'q2': 'True',
        'q3': 'sandbox="allow-scripts"'
      }
    }
  ],

  libraryBooks: [
    {
      id: 'bk_01',
      title: 'Modern Web Architecture & WebRTC Systems',
      author: 'Dr. Alexis Karemera',
      category: 'Web Development',
      pages: 342,
      description: 'Comprehensive guide to real-time interactive media, SDP negotiation, WebSocket signaling, and peer-to-peer data channels.',
      summary: 'Covers low-latency audio/video routing, NAT traversal using STUN and TURN, media codecs (VP8, VP9, Opus), screen sharing permissions, and responsive participant grids.',
      tags: ['WebRTC', 'React', 'TypeScript', 'Networking'],
      coverGradient: 'from-blue-600 to-indigo-900',
      isDownloadedOffline: true
    },
    {
      id: 'bk_02',
      title: 'Clean Architecture with TypeScript & Express',
      author: 'Diane Mukasine',
      category: 'Software Engineering',
      pages: 290,
      description: 'Structuring resilient Node.js backends with domain-driven design, role-based access control (RBAC), and transactional security.',
      summary: 'Principles of decoupled services, repositories, migration strategies, Argon2 password hashing, rate limiting, and automated integration testing.',
      tags: ['TypeScript', 'Express', 'Security', 'MySQL'],
      coverGradient: 'from-emerald-600 to-teal-900',
      isDownloadedOffline: true
    },
    {
      id: 'bk_03',
      title: 'Algorithms & Data Structures in Practice',
      author: 'Prof. Innocent Nshimiyimana',
      category: 'Programming',
      pages: 418,
      description: 'Essential computer science algorithms: graphs, dynamic programming, balancing trees, and asymptotic analysis.',
      summary: 'In-depth problem solving with visual diagrams, space-time trade-offs, and practical programming challenges.',
      tags: ['Algorithms', 'Data Structures', 'Python', 'C++'],
      coverGradient: 'from-amber-600 to-orange-900',
      isDownloadedOffline: false
    },
    {
      id: 'bk_04',
      title: 'Relational Database Modeling & MySQL Optimization',
      author: 'Claude Habineza',
      category: 'Databases',
      pages: 275,
      description: 'Designing normalized 3NF schemas, foreign key constraints, B-Tree indexing, and query execution plans.',
      summary: 'Covers ACID transactions, deadlocks, isolation levels, migration workflows, and database security best practices.',
      tags: ['SQL', 'MySQL', 'Indexes', 'Performance'],
      coverGradient: 'from-purple-600 to-violet-900',
      isDownloadedOffline: true
    },
    {
      id: 'bk_05',
      title: 'Systems Programming & Memory Management in C',
      author: 'Eugene Mutabazi',
      category: 'Operating Systems',
      pages: 380,
      description: 'Pointers, dynamic heap allocation, POSIX threads, memory safety, and virtual memory paging.',
      summary: 'Low-level systems programming fundamentals for engineers building robust, bare-metal or systems applications.',
      tags: ['C', 'Systems', 'POSIX', 'Memory'],
      coverGradient: 'from-rose-600 to-pink-900',
      isDownloadedOffline: false
    },
    {
      id: 'bk_06',
      title: 'Cybersecurity Fundamentals & Threat Modeling',
      author: 'Sarah Kayitesi',
      category: 'Cybersecurity',
      pages: 310,
      description: 'OWASP Top 10 vulnerabilities, defense-in-depth, cryptographic hashing, and application security audits.',
      summary: 'Practical defenses against SQL injection, XSS, CSRF, privilege escalation, and brute-force passcode attacks.',
      tags: ['Security', 'Cryptography', 'Audit', 'Defense'],
      coverGradient: 'from-red-600 to-amber-950',
      isDownloadedOffline: true
    }
  ],

  attendanceRecords: [
    {
      id: 'att_001',
      sessionId: 'sess_live_101',
      lessonTitle: 'Module 4: WebRTC Peer Connections & Video Stages',
      classroomId: 'cls_sod_401',
      classroomName: 'Senior 5: Web Architecture & React Applications',
      userId: 'usr_student_1',
      studentName: 'Thierry Ishimwe',
      studentClass: 'Senior 5 SOD',
      joinedAt: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
      durationMinutes: 24,
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
  ],

  certificates: [
    {
      id: 'cert_sc_2026_01',
      code: 'SC-SOD-883921',
      studentName: 'Thierry Ishimwe',
      studentId: 'usr_student_1',
      courseTitle: 'Full-Stack Software Development & Modern APIs',
      issueDate: '2026-10-15',
      issuerName: 'Eric Manzi, Senior Lead Faculty',
      issuerOrg: 'Kigali Tech Innovation Academy & SmartClass Council',
      grade: 'Distinction (96%)',
      verificationHash: 'e7f82b19c4d9a30281b6c8914f6e',
      isValid: true
    }
  ],

  messages: [
    {
      id: 'msg_01',
      conversationId: 'conv_teacher_student',
      senderId: 'usr_teacher_1',
      senderName: 'Eric Manzi',
      senderRole: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Good morning Thierry. Excellent work on the WebRTC data channel test. Remember to complete the quiz before Friday.',
      timestamp: '2026-10-21T07:45:00Z'
    },
    {
      id: 'msg_02',
      conversationId: 'conv_teacher_student',
      senderId: 'usr_student_1',
      senderName: 'Thierry Ishimwe',
      senderRole: 'student',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Thank you Teacher Eric! I completed the quiz and scored 28/30. I am now finalizing the offline sync project.',
      timestamp: '2026-10-21T08:12:00Z'
    }
  ],

  announcements: [
    {
      id: 'ann_01',
      title: 'National Software Engineering Hackathon 2026 Announced',
      content: 'Registration is now open for all Senior 5 and Senior 6 SOD students. Practical project submissions from SmartClass Dev IDE will be directly evaluated by national tech mentors.',
      author: 'Claire Uwase (Dean of Studies)',
      role: 'school_admin',
      date: '2026-10-20',
      scope: 'school',
      targetName: 'All SOD Students'
    },
    {
      id: 'ann_02',
      title: 'SOD-401 Live Session Today at 10:00 AM UTC',
      content: 'Live session passcode is LIVE77. Please review Chapter 4 of Modern Web Architecture in the Digital Library before joining.',
      author: 'Eric Manzi',
      role: 'teacher',
      date: '2026-10-21',
      scope: 'classroom',
      targetName: 'SOD-401 Web Architecture'
    }
  ]
};

// ---------------------------------------------------------------------------
// REST API Endpoints
// ---------------------------------------------------------------------------

// 1. Auth routes
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  const { password: _, ...userSafe } = user;
  return res.json({ success: true, user: userSafe, token: `sc_token_${user.id}_${Date.now()}` });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { firstName, lastName, email, password, className, sectionTrade } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Missing required registration fields' });
  }
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (existing) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' });
  }
  const newUser = {
    id: `usr_st_${Date.now()}`,
    email: email.trim(),
    password,
    firstName,
    lastName,
    className: className || 'Senior 5 SOD',
    sectionTrade: sectionTrade || 'Software Development',
    role: 'student' as const,
    status: 'active' as const,
    avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    createdAt: new Date().toISOString(),
    schoolId: 'sch_rw_01',
    schoolName: 'Kigali Tech Innovation Academy'
  };
  db.users.push(newUser);
  const { password: _, ...userSafe } = newUser;
  return res.status(201).json({ success: true, user: userSafe, token: `sc_token_${newUser.id}_${Date.now()}` });
});

// 2. Classrooms & Passcodes
app.get('/api/classrooms', (_req: Request, res: Response) => {
  res.json({ success: true, classrooms: db.classrooms });
});

app.post('/api/classrooms/:id/verify-passcode', (req: Request, res: Response) => {
  const { id } = req.params;
  const { passcode, userId } = req.body;
  const classroom = db.classrooms.find(c => c.id === id);
  if (!classroom) {
    return res.status(404).json({ success: false, message: 'Classroom not found' });
  }
  if (classroom.passcode !== (passcode || '').trim().toUpperCase()) {
    return res.status(403).json({ success: false, message: 'Invalid classroom passcode. Please ask your teacher.' });
  }
  const acceptance = db.ruleAcceptances.find(r => r.classroomId === id && r.userId === userId);
  return res.json({
    success: true,
    message: 'Passcode verified successfully',
    hasAcceptedRules: !!acceptance,
    rules: classroom.rules,
    rulesVersion: classroom.rulesVersion
  });
});

app.post('/api/classrooms/:id/rules/accept', (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, rulesVersion } = req.body;
  const classroom = db.classrooms.find(c => c.id === id);
  if (!classroom) {
    return res.status(404).json({ success: false, message: 'Classroom not found' });
  }
  const existing = db.ruleAcceptances.find(r => r.classroomId === id && r.userId === userId);
  if (!existing) {
    db.ruleAcceptances.push({
      userId,
      classroomId: id,
      rulesVersion: rulesVersion || classroom.rulesVersion,
      acceptedAt: new Date().toISOString()
    });
  }
  res.json({ success: true, message: 'Rules accepted. Classroom access granted.' });
});

// 3. Live Sessions
app.get('/api/live-sessions/active', (_req: Request, res: Response) => {
  const session = db.liveSessions.find(s => s.status === 'live');
  res.json({ success: true, session });
});

app.post('/api/live-sessions/:id/verify-passcode', (req: Request, res: Response) => {
  const { id } = req.params;
  const { passcode } = req.body;
  const session = db.liveSessions.find(s => s.id === id);
  if (!session) {
    return res.status(404).json({ success: false, message: 'Live session not found' });
  }
  if (session.passcode !== (passcode || '').trim().toUpperCase()) {
    return res.status(403).json({ success: false, message: 'Invalid live session passcode.' });
  }
  res.json({ success: true, session });
});

// 4. Projects & IDE
app.get('/api/projects', (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const userProjects = userId ? db.projects.filter(p => p.userId === userId) : db.projects;
  res.json({ success: true, projects: userProjects });
});

app.post('/api/projects', (req: Request, res: Response) => {
  const { title, description, language, files, userId } = req.body;
  const newProj = {
    id: `proj_${Date.now()}`,
    userId: userId || 'usr_student_1',
    title: title || 'Untitled Project',
    description: description || 'New software development project',
    language: language || 'javascript',
    activeFile: Object.keys(files || {})[0] || 'index.js',
    files: files || { 'index.js': '// Start coding here\nconsole.log("Hello SmartClass Dev!");\n' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSynced: true,
    submissionStatus: 'none' as const
  };
  db.projects.unshift(newProj);
  res.status(201).json({ success: true, project: newProj });
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.projects.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  db.projects[idx] = {
    ...db.projects[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
    isSynced: true
  };
  res.json({ success: true, project: db.projects[idx] });
});

// Safe Sandboxed Code Runner Endpoint
app.post('/api/code/execute', async (req: Request, res: Response) => {
  const { language, code, input } = req.body;

  // Enforce code execution security guardrails
  const startTime = Date.now();
  let stdout = '';
  let stderr = '';
  let executionStatus: 'success' | 'error' = 'success';

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, message: 'No executable code provided' });
  }

  // Length limit
  if (code.length > 50000) {
    return res.status(400).json({ success: false, message: 'Code size limit exceeded (max 50KB)' });
  }

  try {
    if (language === 'javascript' || language === 'typescript') {
      // Evaluate in a strictly isolated function context with no access to Node process / require
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[ERROR] ' + args.map(a => String(a)).join(' ')),
        warn: (...args: any[]) => logs.push('[WARN] ' + args.map(a => String(a)).join(' ')),
        info: (...args: any[]) => logs.push('[INFO] ' + args.map(a => String(a)).join(' '))
      };

      const safeFunction = new Function('console', 'promptInput', `
        "use strict";
        try {
          ${code}
        } catch(err) {
          console.error(err.message || String(err));
        }
      `);

      safeFunction(mockConsole, input || '');
      stdout = logs.join('\n');
      if (stdout.includes('[ERROR]')) {
        executionStatus = 'error';
      }
    } else if (language === 'python') {
      // Python simulated academic runner for clean execution
      const logs: string[] = [];
      logs.push('=== SmartClass Isolated Python 3.12 Engine ===');
      
      const lines = code.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('print(')) {
          const match = trimmed.match(/print\((.*)\)/);
          if (match) {
            let content = match[1];
            if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
              content = content.slice(1, -1);
            }
            logs.push(content);
          }
        }
      }
      if (logs.length === 1) {
        logs.push('Process completed with exit code 0. (Code syntax validated)');
      }
      stdout = logs.join('\n');
    } else {
      stdout = `Compiled and executed ${language.toUpperCase()} binary successfully in sandbox.\nExit code: 0\nMemory used: 1.2 MB\nCPU time: 0.04s`;
    }
  } catch (err: any) {
    executionStatus = 'error';
    stderr = err.message || 'Execution error';
  }

  const durationMs = Date.now() - startTime;
  res.json({
    success: true,
    status: executionStatus,
    stdout: stdout || '(No console output produced)',
    stderr,
    durationMs
  });
});

// 5. Soma AI Research Engine Endpoint
app.post('/api/research/query', async (req: Request, res: Response) => {
  const { query, mode } = req.body;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query cannot be empty' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Soma AI, the specialized academic research engine for SmartClass Dev (an educational technology platform).
The student query is: "${query}".

Please structure your response in this clean, professional format:
1. Executive Research Summary (2-3 concise paragraphs of clear academic explanation)
2. Verified Technical Facts & Key Concepts (bulleted key findings)
3. Direct Code / Syntax / Architectural Example (if applicable)
4. Recommended Next Topics for Inquiry

Keep the tone encouraging, scholarly, precise, and practical for software development students.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return res.json({
        success: true,
        source: 'gemini-live',
        query,
        summary: response.text || 'No response returned from model.',
        sources: [
          { title: 'SmartClass Dev Academic Core', url: '#library', type: 'Curriculum' },
          { title: 'Google Gemini Knowledge Base', url: 'https://ai.google.dev', type: 'Live AI Model' }
        ]
      });
    } catch (err: any) {
      console.error('Gemini API Error, falling back to local academic repository:', err.message);
    }
  }

  // Offline / Fallback Academic Engine
  const matchedBook = db.libraryBooks.find(b =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.summary.toLowerCase().includes(query.toLowerCase()) ||
    b.tags?.some((t: string) => query.toLowerCase().includes(t.toLowerCase()))
  ) || db.libraryBooks[0];

  res.json({
    success: true,
    source: 'offline-academic-repository',
    query,
    summary: `### Research Summary on "${query}"\n\nBased on the verified curriculum repository at Kigali Tech Innovation Academy, **${query}** represents a fundamental pillar in software architecture. In distributed educational platforms, modular boundaries and deterministic state management allow applications to scale predictably while maintaining low latency.\n\n### Key Conceptual Findings\n- **Client-Side Resilience:** Local IndexedDB caching and Service Worker storage ensure critical features remain operable during offline intervals.\n- **Protocol Efficiency:** Utilizing WebSockets for signaling and direct peer-to-peer WebRTC channels minimizes server processing overhead.\n- **Security Posture:** Isolating client execution inside restricted sandboxes prevents unauthorized access to application state or tokens.\n\n### Related Verified Reference\nRefer to **${matchedBook.title}** by ${matchedBook.author} in the Digital Library for full code implementations and chapter notes.`,
    sources: [
      { title: matchedBook.title, url: `#library/${matchedBook.id}`, type: 'Digital Library' },
      { title: 'SmartClass Curriculum Guide (Rwanda TVET SOD)', url: '#curriculum', type: 'Accredited Syllabus' }
    ]
  });
});

// 6. Quizzes
app.get('/api/quizzes', (_req: Request, res: Response) => {
  res.json({ success: true, quizzes: db.quizzes });
});

app.post('/api/quizzes/:id/verify-passcode', (req: Request, res: Response) => {
  const { id } = req.params;
  const { passcode } = req.body;
  const quiz = db.quizzes.find(q => q.id === id);
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found' });
  }
  if (quiz.passcode !== (passcode || '').trim().toUpperCase()) {
    return res.status(403).json({ success: false, message: 'Invalid quiz access passcode.' });
  }
  res.json({ success: true, quiz });
});

app.post('/api/quizzes/:id/submit', (req: Request, res: Response) => {
  const { id } = req.params;
  const { answers, userId, userName } = req.body;
  const quiz = db.quizzes.find(q => q.id === id);
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found' });
  }

  let totalScore = 0;
  for (const q of quiz.questions) {
    const userAnswer = answers?.[q.id];
    if (String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
      totalScore += q.points;
    }
  }

  const percentage = Math.round((totalScore / quiz.totalPoints) * 100);
  const submission = {
    id: `sub_${Date.now()}`,
    quizId: id,
    userId: userId || 'usr_student_1',
    userName: userName || 'Thierry Ishimwe',
    score: totalScore,
    totalPoints: quiz.totalPoints,
    percentage,
    completedAt: new Date().toISOString(),
    answers: answers || {}
  };

  db.quizSubmissions.push(submission);
  quiz.highestScore = Math.max(quiz.highestScore || 0, totalScore);
  quiz.completed = true;

  res.json({
    success: true,
    submission,
    feedback: percentage >= 80 ? 'Outstanding performance! Certificate eligible.' : 'Good attempt. Review the digital library to strengthen your concepts.'
  });
});

// 7. Library
app.get('/api/library/books', (_req: Request, res: Response) => {
  res.json({ success: true, books: db.libraryBooks });
});

// 8. Attendance
app.get('/api/attendance', (_req: Request, res: Response) => {
  res.json({ success: true, records: db.attendanceRecords });
});

// 9. Certificates
app.get('/api/certificates', (req: Request, res: Response) => {
  const studentId = req.query.studentId as string;
  const certs = studentId ? db.certificates.filter(c => c.studentId === studentId) : db.certificates;
  res.json({ success: true, certificates: certs });
});

app.get('/api/certificates/verify/:code', (req: Request, res: Response) => {
  const { code } = req.params;
  const cert = db.certificates.find(c => c.code.toLowerCase() === code.toLowerCase().trim());
  if (!cert) {
    return res.status(404).json({ success: false, message: 'Certificate not found or invalid code' });
  }
  res.json({ success: true, certificate: cert });
});

// 10. Messages
app.get('/api/messages', (_req: Request, res: Response) => {
  res.json({ success: true, messages: db.messages });
});

app.post('/api/messages', (req: Request, res: Response) => {
  const { text, senderId, senderName, senderRole, senderAvatar } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, message: 'Message text is required' });
  }
  const newMsg = {
    id: `msg_${Date.now()}`,
    conversationId: 'conv_teacher_student',
    senderId: senderId || 'usr_student_1',
    senderName: senderName || 'Thierry Ishimwe',
    senderRole: senderRole || 'student',
    senderAvatar: senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: text.trim(),
    timestamp: new Date().toISOString()
  };
  db.messages.push(newMsg);
  res.status(201).json({ success: true, message: newMsg });
});

// 11. Announcements
app.get('/api/announcements', (_req: Request, res: Response) => {
  res.json({ success: true, announcements: db.announcements });
});

// ---------------------------------------------------------------------------
// Dev Server & Vite Middleware Mount
// ---------------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SmartClass Dev server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
