'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Shield, GraduationCap, RotateCcw, ChevronDown, Sparkles } from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const { currentUser, switchPersona, resetDatabaseData, isLoading } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const personas = [
    {
      id: '25A3HP658',
      name: 'Tushar Goel',
      studentId: '25A3HP658',
      roleTag: 'Learner Persona (Data Analytics)',
      desc: '1st Year PGDM • Wants Python, SQL & Power BI for analytics internship prep',
      badge: 'Learner',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: '25A3HP651',
      name: 'Oshi Shrivastava',
      studentId: '25A3HP651',
      roleTag: 'Senior Mentor (Analytics & Python)',
      desc: '2nd Year • Deloitte USI PPO • Teaches Python for Data Science & SQL (4.95★)',
      badge: 'Senior Mentor',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: '25A3HP613',
      name: 'Naman Aggarwal',
      studentId: '25A3HP613',
      roleTag: 'Senior Mentor (Finance & Valuation)',
      desc: '2nd Year • Goldman Sachs PPO • Teaches Financial Modeling & DCF Valuation (4.9★)',
      badge: 'Finance Mentor',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      id: '25A3HP082',
      name: 'Lavisha Khandelwal',
      studentId: '25A3HP082',
      roleTag: 'Senior Mentor (Consulting & Strategy)',
      desc: '2nd Year • McKinsey PPO • Teaches Case Frameworks & Guesstimates (5.0★)',
      badge: 'Strategy Mentor',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: '25A3HP175',
      name: 'Tanvi Khandelwal',
      studentId: '25A3HP175',
      roleTag: 'Senior Mentor (Product & Marketing)',
      desc: '2nd Year • Microsoft PPO • Teaches PRD Writing, Figma & Growth (4.9★)',
      badge: 'Product Mentor',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'placement.cell@imthyderabad.edu.in',
      name: 'Dr. Arvind Swaminathan',
      studentId: 'Faculty Admin',
      roleTag: 'Placement Cell Head',
      desc: 'Faculty & Placement Cell Admin • Verifies skills, manages 226 JDs & 75 SIPs',
      badge: 'Admin',
      badgeColor: 'bg-slate-900 text-amber-400 border-slate-700'
    }
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-slate-500 font-normal">Active User:</span>
        <span className="text-slate-900 font-bold truncate max-w-[130px] sm:max-w-none">
          {currentUser.name}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
            currentUser.role === 'admin'
              ? 'bg-[#0F2942] text-amber-400 border-amber-500/40'
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}
        >
          {currentUser.role === 'admin' ? 'Admin' : currentUser.studentId}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Live IMT Hyderabad Personas
                </div>
                <p className="text-[11px] text-slate-500">
                  Switch accounts to test peer mentoring across profiles
                </p>
              </div>
            </div>

            <div className="py-1 space-y-1 max-h-[360px] overflow-y-auto">
              {personas.map((persona) => {
                const isSelected = currentUser.studentId === persona.studentId || currentUser.email === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => {
                      switchPersona(persona.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/70 border border-blue-200 font-medium'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{persona.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({persona.studentId})</span>
                      </div>
                      <div className="text-[11px] font-semibold text-blue-900">{persona.roleTag}</div>
                      <p className="text-[10px] text-slate-500 leading-tight line-clamp-1">{persona.desc}</p>
                    </div>

                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border whitespace-nowrap ${persona.badgeColor}`}
                    >
                      {persona.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reset Database Button */}
            <div className="pt-2 border-t border-slate-100 px-1">
              <button
                type="button"
                onClick={() => {
                  resetDatabaseData();
                  setIsOpen(false);
                }}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh Platform Data (226 JDs & 75 SIPs)</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
