'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Users,
  Compass,
  Briefcase,
  BookOpen,
  ArrowLeftRight,
  Bell,
  User,
  ShieldCheck,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    unreadNotifsCount,
    requests,
    currentUser,
    verifications
  } = useApp();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  const pendingReceivedCount = requests.filter(
    (r) => r.mentorId === currentUser.id && r.status === 'PENDING'
  ).length;

  const pendingVerifsCount = verifications.filter((v) => v.status === 'Pending').length;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-14 z-40 lg:z-20 h-screen lg:h-[calc(100vh-3.5rem)] w-64 bg-slate-50 border-r border-slate-200 flex flex-col justify-between py-4 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto px-3">
          
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Home
            </div>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-400'}`} />
              Dashboard
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Discover
            </div>
            <button
              onClick={() => handleNavClick('find_mentor')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'find_mentor'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'find_mentor' ? 'text-white' : 'text-slate-400'}`} />
              Find a Mentor
            </button>
            <button
              onClick={() => handleNavClick('placements')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'placements'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Briefcase className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'placements' ? 'text-white' : 'text-slate-400'}`} />
              Placements & Internships
            </button>
            <button
              onClick={() => handleNavClick('domains')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'domains'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Compass className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'domains' ? 'text-white' : 'text-slate-400'}`} />
              Domains
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              My Activity
            </div>
            <button
              onClick={() => handleNavClick('my_requests')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'my_requests'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <div className="flex items-center">
                <ArrowLeftRight className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'my_requests' ? 'text-white' : 'text-slate-400'}`} />
                My Requests
              </div>
              {pendingReceivedCount > 0 && (
                <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {pendingReceivedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('my_skills')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'my_skills'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'my_skills' ? 'text-white' : 'text-slate-400'}`} />
              My Skills
            </button>
            <button
              onClick={() => handleNavClick('notifications')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <div className="flex items-center">
                <Bell className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'notifications' ? 'text-white' : 'text-slate-400'}`} />
                Notifications
              </div>
              {unreadNotifsCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Account
            </div>
            <button
              onClick={() => handleNavClick('profile')}
              className={`w-full flex items-center px-3 py-2 rounded text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <User className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'profile' ? 'text-white' : 'text-slate-400'}`} />
              Profile
            </button>
          </div>

          {currentUser.role === 'admin' && (
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Administration
              </div>
              <button
                onClick={() => handleNavClick('admin_portal')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'admin_portal'
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center">
                  <ShieldCheck className={`w-4 h-4 mr-3 shrink-0 ${activeTab === 'admin_portal' ? 'text-white' : 'text-emerald-700'}`} />
                  Placement Cell
                </div>
                {pendingVerifsCount > 0 && (
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {pendingVerifsCount}
                  </span>
                )}
              </button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
};
