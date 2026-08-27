'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ImtLogo } from '../../data/imtBranding';
import { DemoSwitcher } from './DemoSwitcher';
import {
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isMobileSidebarOpen }) => {
  const {
    currentUser,
    unreadNotifsCount,
    setActiveTab,
    logout,
    setSelectedSkillForMentorSearch
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Academic Blue & Gold Ribbon */}
      <div className="h-1 bg-gradient-to-r from-[#0B192C] via-amber-400 to-[#1E3A8A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Toggle & IMT Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div onClick={() => setActiveTab('dashboard')} className="cursor-pointer">
              <ImtLogo variant="full" size="md" />
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Python, SQL, Power BI, Deloitte, Goldman Sachs..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.currentTarget.value.trim();
                    if (target) {
                      setSelectedSkillForMentorSearch(target);
                      setActiveTab('find_mentor');
                    }
                  }
                }}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner font-medium"
              />
            </div>
          </div>

          {/* Right: Demo Switcher, Notification, User Pill */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Persona Switcher */}
            <DemoSwitcher />

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-900 text-[10px] font-black flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Profile Avatar Pill */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-2xl hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0B192C] text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-xs shadow-2xs">
                {currentUser.avatar}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium font-data">
                  {currentUser.studentId || currentUser.program}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
