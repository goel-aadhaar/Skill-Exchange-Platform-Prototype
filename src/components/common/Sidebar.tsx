'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Users,
  Compass,
  Building2,
  BookOpen,
  ArrowLeftRight,
  Bell,
  User,
  ShieldCheck,
  Award,
  Sparkles,
  Briefcase
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

  // Pending requests where user is mentor
  const pendingReceivedCount = requests.filter(
    (r) => r.mentorId === currentUser.id && r.status === 'PENDING'
  ).length;

  // Pending admin verification queue count
  const pendingVerifsCount = verifications.filter((v) => v.status === 'Pending').length;

  const mainNavigation = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'find_mentor' as ActiveTab,
      label: 'Find a Peer Mentor',
      icon: Users,
      badge: 'Match'
    },
    {
      id: 'placements' as ActiveTab,
      label: 'Placements & Internships',
      icon: Briefcase,
      badge: '226 JDs'
    },
    {
      id: 'domains' as ActiveTab,
      label: 'Career Tracks & Domains',
      icon: Compass,
      badge: null
    }
  ];

  const myActivityNavigation = [
    {
      id: 'my_skills' as ActiveTab,
      label: 'My Skills & Goals',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'my_requests' as ActiveTab,
      label: 'Mentorship Requests',
      icon: ArrowLeftRight,
      badge: pendingReceivedCount > 0 ? `${pendingReceivedCount} new` : null,
      badgeType: 'urgent'
    },
    {
      id: 'notifications' as ActiveTab,
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : null,
      badgeType: 'counter'
    },
    {
      id: 'profile' as ActiveTab,
      label: 'My Student Profile',
      icon: User,
      badge: null
    }
  ];

  const adminNavigation = [
    {
      id: 'admin_portal' as ActiveTab,
      label: 'Placement Cell Portal',
      icon: ShieldCheck,
      badge: pendingVerifsCount > 0 ? `${pendingVerifsCount} claims` : null,
      badgeType: 'warning'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-40 lg:z-20 h-screen lg:h-[calc(100vh-4.25rem)] w-68 bg-white border-r border-slate-200 flex flex-col justify-between py-5 px-3 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Main Navigation Section */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Main Navigation
            </div>
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0B192C] text-amber-400 shadow-md font-extrabold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Student Activity Section */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              My Mentorship
            </div>
            {myActivityNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0B192C] text-amber-400 shadow-md font-extrabold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        item.badgeType === 'urgent'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : isActive
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Section */}
          {currentUser.role === 'admin' && (
            <div className="space-y-1">
              <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Administration
              </div>
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0B192C] text-amber-400 shadow-md font-extrabold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-amber-400' : 'text-slate-500'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Academic Card */}
        <div className="pt-4 border-t border-slate-200">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-amber-50/50 border border-blue-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F2942]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>IMT Hyderabad Portal</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-snug">
              226 Placements & 75 Internships backed by Neon PostgreSQL.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
