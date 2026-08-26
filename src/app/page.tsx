'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { ToastContainer } from '../components/common/Toast';
import { DemoTourGuide } from '../components/common/DemoTourGuide';
import { MentorProfileModal } from '../components/mentors/MentorProfileModal';
import { RequestMentorModal } from '../components/mentors/RequestMentorModal';
import { CompanyDetailModal } from '../components/companies/CompanyDetailModal';

// Views
import { LoginView } from '../views/LoginView';
import { RegisterView } from '../views/RegisterView';
import { DashboardView } from '../views/DashboardView';
import { FindMentorView } from '../views/FindMentorView';
import { DomainsView } from '../views/DomainsView';
import { PlacementsView } from '../views/PlacementsView';
import { MySkillsView } from '../views/MySkillsView';
import { MyRequestsView } from '../views/MyRequestsView';
import { NotificationsView } from '../views/NotificationsView';
import { ProfileView } from '../views/ProfileView';
import { AdminPortalView } from '../views/AdminPortalView';

const MainAppContent: React.FC = () => {
  const {
    isLoggedIn,
    activeTab,
    currentUser,
    ratings,
    selectedMentorForModal,
    setSelectedMentorForModal,
    selectedCompanyForModal,
    setSelectedCompanyForModal,
    isRequestModalOpen,
    closeRequestModal,
    requestModalMentor,
    requestModalPreselectedSkill,
    openRequestModal,
    setSelectedSkillForMentorSearch,
    setActiveTab
  } = useApp();

  const [isAuthView, setIsAuthView] = useState<'login' | 'register'>('login');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user is not logged in, render Login or Register View
  if (!isLoggedIn) {
    if (isAuthView === 'register') {
      return (
        <>
          <RegisterView onGoToLogin={() => setIsAuthView('login')} />
          <ToastContainer />
        </>
      );
    }
    return (
      <>
        <LoginView onGoToRegister={() => setIsAuthView('register')} />
        <ToastContainer />
      </>
    );
  }

  // Find Mentor helper from Company modal
  const handleFindMentorFromCompany = (skillName: string) => {
    setSelectedSkillForMentorSearch(skillName);
    setActiveTab('find_mentor');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      {/* Platform Header */}
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'find_mentor' && <FindMentorView />}
          {activeTab === 'domains' && <DomainsView />}
          {activeTab === 'placements' && <PlacementsView />}
          {activeTab === 'my_skills' && <MySkillsView />}
          {activeTab === 'my_requests' && <MyRequestsView />}
          {activeTab === 'notifications' && <NotificationsView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'admin_portal' && <AdminPortalView />}
        </main>
      </div>

      {/* Global Modals */}
      {/* 1. Full Mentor Profile Modal */}
      <MentorProfileModal
        mentor={selectedMentorForModal}
        isOpen={!!selectedMentorForModal}
        onClose={() => setSelectedMentorForModal(null)}
        onRequestMentor={(m, skill) => openRequestModal(m, skill)}
        ratings={ratings}
      />

      {/* 2. Request Mentoring Booking Modal */}
      <RequestMentorModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
        mentor={requestModalMentor}
        preselectedSkill={requestModalPreselectedSkill}
      />

      {/* 3. Company Placement & Skill Comparison Modal */}
      <CompanyDetailModal
        company={selectedCompanyForModal}
        isOpen={!!selectedCompanyForModal}
        onClose={() => setSelectedCompanyForModal(null)}
        currentUser={currentUser}
        onFindMentorForSkill={handleFindMentorFromCompany}
      />

      {/* 4. Global Action Toasts */}
      <ToastContainer />

      {/* 5. Evaluator Interactive Demo Tour Guide */}
      <DemoTourGuide />
    </div>
  );
};

export default function Page() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
