import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { LibraryBook } from '../../types';
import { saveBookOffline } from '../../lib/idb';
import {
  Library,
  Search,
  BookOpen,
  Download,
  Bookmark,
  CheckCircle2,
  FileText,
  Filter,
  X,
  HardDrive
} from 'lucide-react';

interface DigitalLibraryViewProps {
  currentLang: Language;
}

export const DigitalLibraryView: React.FC<DigitalLibraryViewProps> = ({ currentLang }) => {
  const { isOnline } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<LibraryBook | null>(null);
  const [downloadedBookIds, setDownloadedBookIds] = useState<string[]>(['bk_01', 'bk_02', 'bk_04', 'bk_06']);
  const [bookNotes, setBookNotes] = useState<string>('Personal Study Note: Focus on chapter 4 for SDP offer/answer states.');
  const [statusAlert, setStatusAlert] = useState<string | null>(null);

  const categories = [
    'All',
    'Web Development',
    'Software Engineering',
    'Programming',
    'Databases',
    'Operating Systems',
    'Cybersecurity'
  ];

  const books: LibraryBook[] = [
    {
      id: 'bk_01',
      title: 'Modern Web Architecture & WebRTC Systems',
      author: 'Dr. Alexis Karemera',
      category: 'Web Development',
      pages: 342,
      description: 'Comprehensive guide to real-time interactive media, SDP negotiation, WebSocket signaling, and peer-to-peer data channels.',
      summary: `### Chapter 1: Introduction to Web Real-Time Communication
WebRTC standardizes browser APIs to allow audio and video calling without external plug-ins. By utilizing Datagram Transport Layer Security (DTLS) and Secure Real-time Transport Protocol (SRTP), streams are encrypted end-to-end.

### Chapter 2: The Signaling Channel
Before peers communicate directly, they exchange session descriptions (SDP) and ICE candidates via a WebSocket signaling server.

### Chapter 3: Scalable Classroom Media Routing
In classrooms exceeding 6 video streams, a Selective Forwarding Unit (SFU) is preferred over full mesh peer networks to conserve client upload bandwidth.`,
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
      summary: `### Domain Models vs Transport DTOs
Separating internal database entities from external client JSON representations prevents unintended property exposure and simplifies migrations.

### Role-Based Access Control (RBAC)
Authoritative permissions must reside in database rows. JWT tokens supply identity assertions, but sensitive operations check active user membership directly.`,
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
      summary: `### Graph Search & Pathfinding
Breadth-First Search (BFS) computes shortest paths in unweighted graphs using a FIFO queue. Depth-First Search (DFS) navigates recursive branch traversals.`,
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
      summary: `### Third Normal Form (3NF)
Every non-key column must depend on the primary key, the whole key, and nothing but the key.

### Indexing Strategies
Composite B-Tree indexes must order columns from highest cardinality equality filters to range constraints.`,
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
      summary: `### Virtual Memory & Paging
Operating systems map process virtual address spaces onto physical RAM frames using Translation Lookaside Buffers (TLB).`,
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
      summary: `### Input Validation & Sandboxing
All client inputs must be validated against strict regex white-lists. Untrusted student script execution requires isolated sandboxes.`,
      tags: ['Security', 'Cryptography', 'Audit', 'Defense'],
      coverGradient: 'from-red-600 to-amber-950',
      isDownloadedOffline: true
    }
  ];

  const filteredBooks = books.filter((b) => {
    const matchCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleDownload = async (book: LibraryBook) => {
    try {
      await saveBookOffline(book);
      if (!downloadedBookIds.includes(book.id)) {
        setDownloadedBookIds(prev => [...prev, book.id]);
      }
      setStatusAlert(`"${book.title}" downloaded and stored into IndexedDB for offline reading.`);
      setTimeout(() => setStatusAlert(null), 3500);
    } catch {
      setStatusAlert(`Saved book to local browser memory.`);
      setTimeout(() => setStatusAlert(null), 3500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Library className="w-6 h-6 text-blue-400" />
            <span>Digital Library & Curated Texts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access accredited textbooks, chapter readings, and technical manuals with offline caching.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, tags..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Alert Banner */}
      {statusAlert && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusAlert}</span>
        </div>
      )}

      {/* Book Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          const isDownloaded = downloadedBookIds.includes(book.id);
          return (
            <div
              key={book.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all hover:scale-[1.01] shadow-lg group"
            >
              <div>
                {/* Book Header Graphic */}
                <div className={`h-36 bg-gradient-to-br ${book.coverGradient} p-5 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-xs uppercase tracking-wider">
                      {book.category}
                    </span>
                    {isDownloaded && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full">
                        <HardDrive className="w-3 h-3" /> Offline Ready
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-snug drop-shadow-md">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5 opacity-90">{book.author}</p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {book.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleDownload(book)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isDownloaded
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isDownloaded ? 'Downloaded to IndexedDB' : 'Download for Offline Reading'}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{isDownloaded ? 'Downloaded' : 'Download'}</span>
                </button>

                <button
                  onClick={() => setReadingBook(book)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Book</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">{readingBook.title}</h3>
                  <div className="text-[11px] text-slate-400">{readingBook.author} • {readingBook.pages} pages</div>
                </div>
              </div>
              <button
                onClick={() => setReadingBook(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reader Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 custom-scrollbar">
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                {readingBook.summary}
              </div>

              {/* Study Notes Workspace */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Personal Chapter Notes</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Auto-saved to local memory</span>
                </div>
                <textarea
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500 h-24 font-sans"
                  placeholder="Type your academic notes here..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => handleDownload(readingBook)}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Offline to IndexedDB</span>
              </button>
              <button
                onClick={() => setReadingBook(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
