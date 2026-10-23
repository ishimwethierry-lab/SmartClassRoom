import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StudentDashboardView } from './views/dashboard/StudentDashboardView';
import { LiveClassroomView } from './views/classroom/LiveClassroomView';
import { ClassroomAccessView } from './views/classroom/ClassroomAccessView';
import { IDEWorkspaceView } from './views/ide/IDEWorkspaceView';
import { SomaAIView } from './views/soma/SomaAIView';
import { DigitalLibraryView } from './views/library/DigitalLibraryView';
import { QuizTakingView } from './views/quiz/QuizTakingView';
import { AttendanceView } from './views/attendance/AttendanceView';
import { CertificatesView } from './views/certificates/CertificatesView';
import { InboxView } from './views/inbox/InboxView';
import { CoursesView } from './views/courses/CoursesView';
import { RecordingsView } from './views/recordings/RecordingsView';
import { AnnouncementsView } from './views/announcements/AnnouncementsView';
import { ProfileView } from './views/profile/ProfileView';
import { SettingsView } from './views/settings/SettingsView';
import { LoginView } from './views/auth/LoginView';
import { RegisterView } from './views/auth/RegisterView';
import { Language } from './lib/i18n';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (!user) {
    if (authMode === 'register') {
      return (
        <RegisterView
          onSwitchToLogin={() => setAuthMode('login')}
          currentLang={currentLang}
        />
      );
    }
    return (
      <LoginView
        onSwitchToRegister={() => setAuthMode('register')}
        currentLang={currentLang}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Global Application Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onToggleMobileNav={() => setMobileNavOpen(prev => !prev)}
        onNavigate={setCurrentView}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 16-Item Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          currentLang={currentLang}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        {/* Main Routed Content Stage */}
        <main className="flex-1 lg:pl-64 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {currentView === 'dashboard' && (
            <StudentDashboardView
              onNavigate={setCurrentView}
              currentLang={currentLang}
            />
          )}

          {currentView === 'classroom-access' && (
            <ClassroomAccessView
              onJoinSuccess={() => setCurrentView('live-classroom')}
              currentLang={currentLang}
            />
          )}

          {currentView === 'live-classroom' && (
            <LiveClassroomView
              onLeave={() => setCurrentView('dashboard')}
              currentLang={currentLang}
            />
          )}

          {currentView === 'coding-ide' && (
            <IDEWorkspaceView currentLang={currentLang} />
          )}

          {currentView === 'projects' && (
            <IDEWorkspaceView currentLang={currentLang} />
          )}

          {currentView === 'soma-ai' && (
            <SomaAIView currentLang={currentLang} />
          )}

          {currentView === 'library' && (
            <DigitalLibraryView currentLang={currentLang} />
          )}

          {currentView === 'quizzes' && (
            <QuizTakingView currentLang={currentLang} />
          )}

          {currentView === 'attendance' && (
            <AttendanceView currentLang={currentLang} />
          )}

          {currentView === 'certificates' && (
            <CertificatesView currentLang={currentLang} />
          )}

          {currentView === 'inbox' && (
            <InboxView currentLang={currentLang} />
          )}

          {currentView === 'courses' && (
            <CoursesView
              onNavigate={setCurrentView}
              currentLang={currentLang}
            />
          )}

          {currentView === 'recordings' && (
            <RecordingsView currentLang={currentLang} />
          )}

          {(currentView === 'announcements' || currentView === 'notifications') && (
            <AnnouncementsView currentLang={currentLang} />
          )}

          {currentView === 'profile' && (
            <ProfileView currentLang={currentLang} />
          )}

          {currentView === 'settings' && (
            <SettingsView
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
