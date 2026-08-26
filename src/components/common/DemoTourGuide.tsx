'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  X,
  Database
} from 'lucide-react';

export const DemoTourGuide: React.FC = () => {
  const { switchPersona, setActiveTab, setSelectedSkillForMentorSearch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const scenarios = [
    {
      id: 's1',
      title: '1. Learner Flow: Tushar (25A3HP658) requests Oshi',
      desc: 'Log in as Tushar Goel (1st Yr) → see missing Python/SQL gaps → find Oshi Shrivastava (Deloitte PPO) → send real DB request.',
      action: async () => {
        await switchPersona('25A3HP658');
        setActiveTab('dashboard');
      }
    },
    {
      id: 's2',
      title: '2. Mentor Flow: Oshi (25A3HP651) accepts request',
      desc: 'Log in as Oshi Shrivastava → check live incoming request from Tushar in PostgreSQL → Accept with Meet link.',
      action: async () => {
        await switchPersona('25A3HP651');
        setActiveTab('my_requests');
      }
    },
    {
      id: 's3',
      title: '3. 226 Placements & 75 Internships Skill Matcher',
      desc: 'Browse 226 JDs & 75 SIPs from attached Excel repos → compare student skills with company criteria → 1-click peer bridge.',
      action: async () => {
        await switchPersona('25A3HP658');
        setActiveTab('placements');
      }
    },
    {
      id: 's4',
      title: '4. Placement Cell Admin: Dr. Arvind verifies skills',
      desc: 'Log in as Faculty Admin → verify student skill claims in live queue → approve badges and manage recruiters.',
      action: async () => {
        await switchPersona('placement.cell@imthyderabad.edu.in');
        setActiveTab('admin_portal');
      }
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-full">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F2942] text-amber-400 shadow-2xl hover:bg-slate-900 border border-amber-500/40 text-xs font-bold transition-all animate-bounce"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>IMT Multi-User Demo Guide</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-900/20 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center text-xs font-bold">
                IMT
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  IMT Hyderabad Multi-User Evaluation
                </h4>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Database className="w-2.5 h-2.5 text-emerald-600" />
                  Live Neon PostgreSQL Workflows
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={sc.action}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-400/60 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-blue-900">
                  <span>{sc.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {sc.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-100">
            Clicking a scenario executes a database-backed session switch & screen transition.
          </div>
        </div>
      )}
    </div>
  );
};
