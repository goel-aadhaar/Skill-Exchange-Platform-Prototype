'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Shield, GraduationCap, RotateCcw, ChevronDown, Sparkles, UserPlus } from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const { currentUser, switchPersona, resetToDemoData, setActiveTab, isLoggedIn } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const personas = [
    {
      id: 'student-aadhaar',
      name: 'Aadhaar Verma',
      roleTag: 'Learner Persona',
      desc: '1st Year PGDM (Analytics) • Needs SQL & Power BI for Deloitte prep',
      badge: 'Learner',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'student-rahul',
      name: 'Rahul Sharma',
      roleTag: 'Senior Mentor (Analytics)',
      desc: '2nd Year • Deloitte PPO • Teaches SQL & Power BI (4.9★)',
      badge: 'Mentor',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'student-priya',
      name: 'Priya Nair',
      roleTag: 'Finance Mentor',
      desc: '2nd Year • Goldman Sachs PPO • Teaches Financial Modeling (4.9★)',
      badge: 'Mentor',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'admin-arvind',
      name: 'Dr. Arvind Swaminathan',
      roleTag: 'Placement Cell Head',
      desc: 'Faculty & Placement Cell Admin • Verifies skills & manages drives',
      badge: 'Admin',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/80 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-slate-500 font-normal">Active Persona:</span>
        <span className="text-slate-900 font-semibold truncate max-w-[130px] sm:max-w-none">
          {currentUser.name}
        </span>
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${
            currentUser.role === 'admin'
              ? 'bg-rose-100 text-rose-800 border-rose-200'
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          {currentUser.role === 'admin' ? 'Admin' : currentUser.skillsToTeach.length > 0 && currentUser.sessionsCompleted > 5 ? 'Mentor' : 'Student'}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Interactive Persona Switcher
                </div>
                <p className="text-[11px] text-slate-500">
                  Instantly simulate both sides of the skill-exchange workflow
                </p>
              </div>
            </div>

            <div className="py-1 space-y-1 max-h-[340px] overflow-y-auto">
              {personas.map((persona) => {
                const isSelected = currentUser.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => {
                      switchPersona(persona.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-100/90 border border-slate-300/80'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {persona.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${persona.badgeColor}`}>
                          {persona.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {persona.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-[#8B1E2D] bg-[#8B1E2D]/10 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                View Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  resetToDemoData();
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-800 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                title="Reset all states back to initial pristine demo data"
              >
                <RotateCcw className="w-3 h-3 text-rose-500" />
                Reset Demo Data
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
