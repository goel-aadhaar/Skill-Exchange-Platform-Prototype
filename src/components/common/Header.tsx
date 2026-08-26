'use client';

import React, { useState } from 'react';
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
  Briefcase,
  BookOpen,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isMobileSidebarOpen
}) => {
  const {
    currentUser,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
    setSelectedCompanyForModal,
    setSelectedSkillForMentorSearch,
    skills,
    companies,
    students,
    logout
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Global search matching
  const matchingSkills = searchQuery.trim()
    ? skills.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.domain.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingCompanies = searchQuery.trim()
    ? companies.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.domain.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingMentors = searchQuery.trim()
    ? students.filter(
        (st) =>
          st.role !== 'admin' &&
          (st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            st.skillsToTeach.some((sk) => sk.skillName.toLowerCase().includes(searchQuery.toLowerCase())))
      ).slice(0, 3)
    : [];

  const hasSearchResults =
    matchingSkills.length > 0 || matchingCompanies.length > 0 || matchingMentors.length > 0;

  const userNotifications = notifications
    .filter((n) => n.userId === currentUser.id || n.userId === 'all')
    .slice(0, 6);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              className="cursor-pointer"
              onClick={() => setActiveTab(currentUser.role === 'admin' ? 'admin_portal' : 'dashboard')}
            >
              <ImtLogo variant="compact" />
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search skills (SQL, Power BI), mentors, companies (Deloitte)..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Global Search Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 1 && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSearchOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150 max-h-[380px] overflow-y-auto">
                  {!hasSearchResults ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No matching skills, mentors, or companies found for &quot;{searchQuery}&quot;.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matchingSkills.length > 0 && (
                        <div>
                          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Skills
                          </div>
                          {matchingSkills.map((sk) => (
                            <button
                              key={sk.id}
                              type="button"
                              onClick={() => {
                                setSelectedSkillForMentorSearch(sk.name);
                                setActiveTab('find_mentor');
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between text-slate-800"
                            >
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-3.5 h-3.5 text-[#8B1E2D]" />
                                <span className="font-semibold">{sk.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                {sk.domain}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {matchingCompanies.length > 0 && (
                        <div>
                          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Companies & Placement Drives
                          </div>
                          {matchingCompanies.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setSelectedCompanyForModal(c);
                                setActiveTab('placements');
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between text-slate-800"
                            >
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                                <span className="font-semibold">{c.name}</span>
                              </div>
                              <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                {c.tier}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {matchingMentors.length > 0 && (
                        <div>
                          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Peer Mentors
                          </div>
                          {matchingMentors.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => {
                                setActiveTab('find_mentor');
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between text-slate-800"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 text-[10px] font-bold flex items-center justify-center text-slate-700">
                                  {m.avatar}
                                </div>
                                <div>
                                  <span className="font-semibold">{m.name}</span>
                                  <span className="text-[11px] text-slate-500 ml-1.5">
                                    ({m.program})
                                  </span>
                                </div>
                              </div>
                              <span className="text-[11px] font-semibold text-amber-600">
                                {m.rating}★
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right: Demo Switcher + Notifications + User Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instant Demo Switcher */}
            <DemoSwitcher />

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B1E2D] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotifDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                        {unreadNotificationsCount > 0 && (
                          <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded font-semibold">
                            {unreadNotificationsCount} new
                          </span>
                        )}
                      </div>
                      {unreadNotificationsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => markAllNotificationsAsRead()}
                          className="text-[11px] text-[#8B1E2D] hover:underline font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="py-1 divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {userNotifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-500">
                          You have no notifications.
                        </div>
                      ) : (
                        userNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.targetTab) {
                                setActiveTab(notif.targetTab as any);
                              }
                              setIsNotifDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                              notif.isRead ? 'hover:bg-slate-50 opacity-80' : 'bg-rose-50/40 hover:bg-rose-50/70'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-slate-900 leading-snug">
                                {notif.title}
                              </span>
                              {!notif.isRead && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D] shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('notifications');
                          setIsNotifDropdownOpen(false);
                        }}
                        className="text-xs font-semibold text-[#8B1E2D] hover:underline"
                      >
                        View all notifications →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-xs shadow-2xs border border-[#701420]">
                  {currentUser.avatar}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                    {currentUser.program}
                  </div>
                </div>
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {currentUser.studentId} • {currentUser.email}
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('profile');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                      >
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        My Profile & Settings
                      </button>

                      {currentUser.role === 'admin' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('admin_portal');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                        >
                          <Shield className="w-3.5 h-3.5 text-rose-600" />
                          Placement Cell Admin Portal
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('my_skills');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          Manage My Skills
                        </button>
                      )}
                    </div>

                    <div className="pt-1 mt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
