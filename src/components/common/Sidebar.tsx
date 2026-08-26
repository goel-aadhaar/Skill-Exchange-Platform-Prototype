'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Users,
  Compass,
  Building2,
  BookMarked,
  ArrowLeftRight,
  Bell,
  User,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    requests,
    unreadNotificationsCount,
    verifications
  } = useApp();

  // Compute live activity badges
  const pendingRequestsCount = requests.filter(
    (r) =>
      (r.mentorId === currentUser.id && r.status === 'Pending') ||
      (r.requesterId === currentUser.id && (r.status === 'Accepted' || r.status === 'Pending'))
  ).length;

  const pendingVerificationsCount = verifications.filter((v) => v.status === 'Pending').length;

  const navItemClass = (tab: ActiveTab) => {
    const isActive = activeTab === tab;
    return `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-[#8B1E2D] text-white shadow-xs'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`;
  };

  const iconClass = (tab: ActiveTab) => {
    const isActive = activeTab === tab;
    return `w-4 h-4 mr-3 shrink-0 ${
      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'
    }`;
  };

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose?.();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 py-5 px-3">
      {/* Student Profile Quick Card */}
      <div className="px-2 pb-4 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B1E2D] to-[#681320] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {currentUser.role === 'admin' ? 'Placement Cell Admin' : currentUser.program}
            </div>
            {currentUser.role !== 'admin' && (
              <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-700 font-semibold">
                <span>{currentUser.rating}★</span>
                <span className="text-slate-400">•</span>
                <span>{currentUser.sessionsCompleted} sessions</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {/* Main Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Discovery
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className={navItemClass('dashboard')}
            >
              <div className="flex items-center">
                <LayoutDashboard className={iconClass('dashboard')} />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('find_mentor')}
              className={navItemClass('find_mentor')}
            >
              <div className="flex items-center">
                <Users className={iconClass('find_mentor')} />
                <span>Find a Peer Mentor</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  activeTab === 'find_mentor'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                Match
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('placements')}
              className={navItemClass('placements')}
            >
              <div className="flex items-center">
                <Building2 className={iconClass('placements')} />
                <span>Placements & Internships</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('domains')}
              className={navItemClass('domains')}
            >
              <div className="flex items-center">
                <Compass className={iconClass('domains')} />
                <span>Domains & Skills</span>
              </div>
            </button>
          </div>
        </div>

        {/* My Activity Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            My Learning & Mentoring
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('my_skills')}
              className={navItemClass('my_skills')}
            >
              <div className="flex items-center">
                <BookMarked className={iconClass('my_skills')} />
                <span>My Skills</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                  activeTab === 'my_skills'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {currentUser.skillsToTeach.length + currentUser.skillsToLearn.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('my_requests')}
              className={navItemClass('my_requests')}
            >
              <div className="flex items-center">
                <ArrowLeftRight className={iconClass('my_requests')} />
                <span>My Requests</span>
              </div>
              {pendingRequestsCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'my_requests'
                      ? 'bg-white text-[#8B1E2D]'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('notifications')}
              className={navItemClass('notifications')}
            >
              <div className="flex items-center">
                <Bell className={iconClass('notifications')} />
                <span>Notifications</span>
              </div>
              {unreadNotificationsCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'notifications'
                      ? 'bg-white text-[#8B1E2D]'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('profile')}
              className={navItemClass('profile')}
            >
              <div className="flex items-center">
                <User className={iconClass('profile')} />
                <span>My Profile</span>
              </div>
            </button>
          </div>
        </div>

        {/* Administration Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Placement Cell Administration
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('admin_portal')}
              className={navItemClass('admin_portal')}
            >
              <div className="flex items-center">
                <ShieldCheck className={iconClass('admin_portal')} />
                <span>Admin & Verification</span>
              </div>
              {pendingVerificationsCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'admin_portal'
                      ? 'bg-white text-[#8B1E2D]'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {pendingVerificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer info badge */}
      <div className="pt-3 border-t border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between text-slate-700 font-semibold">
            <span>IMT Skill-Exchange</span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded">
              v1.0 Live
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Connecting 720+ students across PGDM cohorts for campus recruitment.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full bg-white shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
